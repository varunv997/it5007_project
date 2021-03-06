#include <stdio.h>
#include "WinMemStream.h"

#if defined(_DEBUG)
#  define LOG_DEBUG(...)  ::fprintf(stdout, __VA_ARGS__)
#else
#  define LOG_DEBUG(...)
#endif
#define LOG_INFO(...)  ::fprintf(stdout, __VA_ARGS__)
#define LOG_ERROR(...)  ::fprintf(stderr, __VA_ARGS__)

WinMemStream::WinMemStream(BYTE *pData, UINT nMaxSize, BOOL bDeleteOnDestroy)
	: _refCount(1)
	, _pData(pData)
	, _nSize(0)
	, _nMaxSize(nMaxSize)
	, _bDeleteOnDestroy(bDeleteOnDestroy)
{
}

WinMemStream::~WinMemStream()
{
	if (_pData && _bDeleteOnDestroy)
	{
		delete[] _pData;
	}
}

HRESULT WinMemStream::Clone(IStream **ppstm)
{
	LOG_DEBUG("WinMemStream::Clone()\n");
	return S_OK;
}

HRESULT WinMemStream::Commit(DWORD grfCommitFlags)
{
	LOG_DEBUG("WinMemStream::Commit()\n");
	return S_OK;
}

HRESULT WinMemStream::CopyTo(IStream *pstm, ULARGE_INTEGER cb, ULARGE_INTEGER *pcbRead, ULARGE_INTEGER *pcbWritten)
{
	LOG_DEBUG("WinMemStream::CopyTo()\n");
	return S_OK;
}

HRESULT WinMemStream::LockRegion(ULARGE_INTEGER libOffset, ULARGE_INTEGER cb, DWORD dwLockType)
{
	LOG_DEBUG("WinMemStream::LockRegion()\n");
	return S_OK;
}

HRESULT WinMemStream::Revert()
{
	LOG_DEBUG("WinMemStream::Revert()\n");
	return S_OK;
}

HRESULT WinMemStream::Seek(LARGE_INTEGER dlibMove, DWORD dwOrigin, ULARGE_INTEGER *plibNewPosition)
{
	LOG_DEBUG("WinMemStream::Seek()\n");
	return S_OK;
}

HRESULT WinMemStream::SetSize(ULARGE_INTEGER libNewSize)
{
	LOG_DEBUG("WinMemStream::SetSize()\n");
	return S_OK;
}

HRESULT WinMemStream::Stat(STATSTG *pstatstg, DWORD grfStatFlag)
{
	LOG_DEBUG("WinMemStream::Stat()\n");
	return S_OK;
}

HRESULT WinMemStream::UnlockRegion(ULARGE_INTEGER libOffset, ULARGE_INTEGER cb, DWORD dwLockType)
{
	LOG_DEBUG("WinMemStream::UnlockRegion()\n");
	return S_OK;
}

HRESULT WinMemStream::QueryInterface(const IID &riid, void **ppvObject)
{
	return E_NOINTERFACE;/*S_OK;*/
}

ULONG WinMemStream::AddRef(void)
{
	LOG_DEBUG("WinMemStream::AddRef()\n");
	return ++_refCount;
}

ULONG WinMemStream::Release(void)
{
	LOG_DEBUG("WinMemStream::Release()\n");
	return --_refCount;
}

HRESULT WinMemStream::Read(void *pv, ULONG cb, ULONG *pcbReaded)
{
	return E_FAIL;
}

HRESULT WinMemStream::Write(const void *pv, ULONG cb, ULONG *pcbWritten)
{
	ULONG nWritten = 0;
	LOG_DEBUG("WinMemStream::Write()\n");
	if (pv)
	{
		if (_pData && cb)
		{
			nWritten = _nMaxSize - _nSize;
			if (nWritten > cb)
			{
				nWritten = cb;
			}
			memcpy (_pData + _nSize, pv, nWritten);
			_nSize += nWritten;
		}
		if (pcbWritten)
		{
			*pcbWritten = nWritten;
		}
		return S_OK;
	}
	return E_FAIL;
}

void WinMemStream::reset()
{
	_nSize = 0;
}

const BYTE *WinMemStream::getData() const
{
	return _pData;
}

UINT WinMemStream::getSize() const
{
	return _nSize;
}