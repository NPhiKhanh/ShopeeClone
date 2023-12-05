function Footer() {
  return (
    <footer className='py-5 bg-neutral-100 border-t-4 border-solid border-orange'>
      <div className='max-w-7xl mx-auto px-8 mt-10'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
          <div className='col-span-1'>
            <div className='text-gray-600 text-sm'>© 2023 Shopee. Tất cả các quyền được bảo lưu.</div>
          </div>
          <div className='col-span-2'>
            <div className='text-gray-600 text-sm'>
              Quốc gia & Khu vực: Singapore Indonesia Đài Loan Thái Lan Malaysia Việt Nam Philippines Brazil México
              Colombia Chile
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-4 mt-10 lg:mt-20 px-24'>
          <div className='col-span-1 text-xs'>
            <div className='text-gray-600'>CHÍNH SÁCH BẢO MẬT</div>
          </div>
          <div className='col-span-1 text-xs'>
            <div className='text-gray-600'>QUY CHẾ HOẠT ĐỘNG</div>
          </div>
          <div className='col-span-1 text-xs'>
            <div className='text-gray-600'>CHÍNH SÁCH VẬN CHUYỂN</div>
          </div>
          <div className='col-span-1 text-xs'>
            <div className='text-gray-600'>CHÍNH SÁCH TRẢ HÀNG VÀ HOÀN TIỀN</div>
          </div>
        </div>

        <div className='text-center text-gray-600 text-xs mt-10'>
          <div className='mb-6'>Công ty TNHH Shopee</div>
          <div className='mt-2'>
            Địa chỉ: Tầng 4-5-6, Tòa nhà Capital Place, số 29 đường Liễu Giai, Phường Ngọc Khánh, Quận Ba Đình, Thành
            phố Hà Nội, Việt Nam. Tổng đài hỗ trợ: 19001221 - Email: cskh@hotro.shopee.vn
          </div>
          <div className='mt-2'>
            Chịu Trách Nhiệm Quản Lý Nội Dung: Nguyễn Đức Trí - Điện thoại liên hệ: 024 73081221 (ext 4678)
          </div>
          <div className='mt-2'>
            Mã số doanh nghiệp: 0106773786 do Sở Kế hoạch & Đầu tư TP Hà Nội cấp lần đầu ngày 10/02/2015
          </div>
          <div className='mt-2'>© 2015 - Bản quyền thuộc về Công ty TNHH Shopee</div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
