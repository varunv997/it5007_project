#ifndef __WINSCREENCAPTURE_D3D9_H__
#define __WINSCREENCAPTURE_D3D9_H__

#include "IWinScreenCapture.h"
#include <d3d9.h>

/**
 * Screen capture class for capturing using Direct3D 9
 */
class WinScreenCapture_D3D9 : public IWinScreenCapture
{
public:
	WinScreenCapture_D3D9(const TCHAR *strDisplayDevice=NULL);
	~WinScreenCapture_D3D9();

	BOOL getCurrentScreenSize(UINT &nSizeX, UINT &nSizeY) const;

	BOOL captureScreenRect(UINT nX0, UINT nY0, UINT nSizeX, UINT nSizeY, CImage &img);

private:
	UINT               _nAdapterId;
	IDirect3D9        *_pD3D;
	IDirect3DDevice9  *_pDevice;
	IDirect3DSurface9 *_pSurface;
};

#endif // __WINSCREENCAPTURE_D3D9_H__
