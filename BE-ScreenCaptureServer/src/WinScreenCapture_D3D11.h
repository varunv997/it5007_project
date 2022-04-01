#ifndef __WINSCREENCAPTURE_D3D11_H__
#define __WINSCREENCAPTURE_D3D11_H__

#include "IWinScreenCapture.h"
#include <d3d11_1.h>
#include <dxgi.h>

/**
 * Screen capture class for capturing using Direct3D 11
 */
class WinScreenCapture_D3D11 : public IWinScreenCapture
{
public:
	WinScreenCapture_D3D11(const TCHAR *strDisplayDevice=NULL);
	~WinScreenCapture_D3D11();

	BOOL getCurrentScreenSize(UINT &nSizeX, UINT &nSizeY) const;

	BOOL captureScreenRect(UINT nX0, UINT nY0, UINT nSizeX, UINT nSizeY, CImage &img);

private:
	BOOL duplicateOutput();

private:
	ID3D11Device           *_pD3D11Device;
	ID3D11DeviceContext    *_pD3D11Context;
	IDXGIOutput1           *_pDxgiOutput;
	IDXGIOutputDuplication *_pDxgiOutputDuplication;
	ID3D11Texture2D        *_pTexture;
	CImage                  _imgTmp;
};

#endif // __WINSCREENCAPTURE_D3D11_H__
