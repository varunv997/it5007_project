#include "WinScreenCapture_GDI.h"
//-------------------------------------------------------------------------------------------------
#if defined(_DEBUG)
#  define LOG_DEBUG(...)  ::fprintf(stdout, __VA_ARGS__)
#else
#  define LOG_DEBUG(...)
#endif
#define LOG_INFO(...)  ::fprintf(stdout, __VA_ARGS__)
#define LOG_ERROR(...)  ::fprintf(stderr, __VA_ARGS__)
//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------

WinScreenCapture_GDI::WinScreenCapture_GDI(const TCHAR *strDisplayDevice)
{
	if (!strDisplayDevice || !*strDisplayDevice)
		strDisplayDevice = _T("DISPLAY");

	// Create a screen device context
	//_hDCScreen = GetDC(NULL); // HDC only of primary monitor
	_hDCScreen = ::CreateDC(strDisplayDevice, NULL, NULL, NULL); // Create a DC covering all the monitors
}
//-------------------------------------------------------------------------------------------------

WinScreenCapture_GDI::~WinScreenCapture_GDI()
{
	// Clean up
	if (_hDCScreen)
	{
		::DeleteDC(_hDCScreen);
	}
}
//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------

BOOL WinScreenCapture_GDI::getCurrentScreenSize(UINT &nSizeX, UINT &nSizeY) const
{
	nSizeX = ::GetSystemMetrics(SM_CXSCREEN);
	nSizeY = ::GetSystemMetrics(SM_CYSCREEN);
	return TRUE;
}
//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------

BOOL WinScreenCapture_GDI::captureScreenRect(UINT nX0, UINT nY0, UINT nSizeX, UINT nSizeY, CImage &img)
{
	BOOL nRet = FALSE;
	if (_hDCScreen)
	{
		if ((nSizeX > 0) && (nSizeY > 0))
		{
			if (!img.IsNull())
			{
				// Stretch-blit from screen to image device context
				// Note: CAPTUREBLT flag is required to capture layered windows
				HDC hDCImage = img.GetDC();
				::SetStretchBltMode(hDCImage, HALFTONE);
				nRet = ::StretchBlt(hDCImage, 0, 0, img.GetWidth(), img.GetHeight(), _hDCScreen, nX0, nY0, nSizeX, nSizeY, SRCCOPY | CAPTUREBLT);
				img.ReleaseDC();
			}
			else LOG_ERROR("captureScreenRect() Target image was not initialized!\n");
		}
		else LOG_ERROR("captureScreenRect() Invalid rect size (%ux%u)!\n", nSizeX, nSizeY);
	}
	else LOG_ERROR("captureScreenRect() Capturer was not properly initialized!\n");
	return nRet;
}
//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------
