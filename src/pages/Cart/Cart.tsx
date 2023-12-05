import { useMutation, useQuery } from '@tanstack/react-query'
import { buyProductInCart, deleteProductInCart, getProductInCart, updateProductInCart } from '../../api/cart.api'
import { Link, useLocation } from 'react-router-dom'
import { keyBy } from 'lodash'
import { toast } from 'react-toastify'
import { generateUrlName } from '../../utils/utils'
import InputQuantity from '../../components/InputQuantity'
import ButtonSubmit from '../../components/ButtonSubmit'
import { useState, useEffect, useMemo } from 'react'
import { Cart as CartType, NewCartList } from '../../types/cart.type'
import noProduct from '../../assets/images/no_product.png'

function Cart() {
  const [newCartList, setNewCartList] = useState<NewCartList[]>([])

  const { data: cartListData, refetch } = useQuery({
    queryKey: ['cartList'],
    queryFn: () => getProductInCart({ status: -1 })
  })

  const location = useLocation()
  const cartId = location.state?.purchaseId
  const cartList = cartListData?.data.data
  const isCheckedAll = useMemo(() => newCartList.every((item) => item.checked), [newCartList])
  const checkedProductList = useMemo(() => newCartList.filter((item) => item.checked), [newCartList])
  const totalPrice = useMemo(
    () => checkedProductList.reduce((total, item) => total + item.buy_count * item.price, 0),
    [checkedProductList]
  )

  useEffect(() => {
    setNewCartList((prev) => {
      const newObj = keyBy(prev, '_id')
      return (
        cartList?.map((item) => {
          const isCheckedFromLocation = cartId === item._id
          return {
            ...item,
            disabled: false,
            checked: isCheckedFromLocation || Boolean(newObj[item._id]?.checked)
          }
        }) || []
      )
    })
  }, [cartList])

  useEffect(() => {
    return () => {
      history.replaceState(null, '')
    }
  }, [])

  const updateQuantityCart = useMutation({
    mutationFn: updateProductInCart,
    onSuccess: () => {
      refetch()
    }
  })
  const buyProduct = useMutation({
    mutationFn: buyProductInCart,
    onSuccess: (data) => {
      refetch()
      toast.success(data.data.message, { autoClose: 2000 })
    }
  })
  const deleteProduct = useMutation({
    mutationFn: deleteProductInCart,
    onSuccess: () => {
      refetch()
    }
  })

  const quantityButtonHandler = (cartIndex: number, value: number, enabled: boolean) => {
    if (enabled) {
      const productInCart = newCartList[cartIndex]
      setNewCartList((prev) => {
        const newArr = [...prev]
        const newItem = newArr[cartIndex]
        newItem.disabled = true
        return newArr
      })
      updateQuantityCart.mutate({ product_id: productInCart.product._id, buy_count: value })
    }
  }

  const deleteHanlder = (cartIndex: number) => {
    const cartId = newCartList[cartIndex]._id
    deleteProduct.mutate([cartId])
  }

  const deleteProductsHanlder = () => {
    const cartId = checkedProductList.map((item) => item._id)
    deleteProduct.mutate(cartId)
  }

  const buyProductHandler = () => {
    if (checkedProductList.length > 0) {
      const body = checkedProductList.map((item) => ({ product_id: item.product._id, buy_count: item.buy_count }))
      buyProduct.mutate(body)
    }
  }

  const changeNumberInputHandler = (cartIndex: number, value: number) => {
    setNewCartList((prev) => {
      const newArr = [...prev]
      const newItem = newArr[cartIndex]
      newItem.buy_count = value
      return newArr
    })
  }

  const checkedHanlder = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCartList((prev) => {
      const newArr = [...prev]
      const newItem = newArr[index]
      newItem.checked = e.target.checked
      return newArr
    })
  }
  const checkedAllHanlder = () => {
    setNewCartList((prev) => prev.map((item) => ({ ...item, checked: !isCheckedAll })))
  }

  return (
    <div className='py-12'>
      <div className='max-w-7xl mx-auto px-8'>
        {newCartList.length > 0 ? (
          <>
            <div className='overflow-auto'>
              <div className='min-w-[1000px]'>
                <div className='grid grid-cols-12 py-5 px-9 text-sm capitalize text-gray-500 shadow'>
                  <div className='col-span-6'>
                    <div className='flex items-center'>
                      <div className='flex flex-shrink-0 items-center justify-center pr-5'>
                        <input
                          type='checkbox'
                          className='h-5 w-5 accent-orange'
                          checked={isCheckedAll}
                          onChange={checkedAllHanlder}
                        />
                      </div>
                      <div className='flex-grow'>Sản phẩm</div>
                    </div>
                  </div>
                  <div className='col-span-6'>
                    <div className='grid grid-cols-5'>
                      <div className='col-span-2 text-center'>Đơn giá</div>
                      <div className='col-span-1 text-center'>Số lượng</div>
                      <div className='col-span-1 text-center'>Số tiền</div>
                      <div className='col-span-1 text-center'>Thao tác</div>
                    </div>
                  </div>
                </div>

                <div className='my-3'>
                  {newCartList?.map((item, index) => (
                    <div
                      key={item._id}
                      className='grid grid-cols-12 items-center rounded-sm border border-gray-200 py-5 px-9 text-center text-sm mt-5'
                    >
                      <div className='col-span-6'>
                        <div className='flex items-center'>
                          <div className='flex flex-shrink-0 items-center justify-center pr-5'>
                            <input
                              type='checkbox'
                              className='h-5 w-5 accent-orange'
                              checked={item.checked}
                              onChange={(e) => checkedHanlder(index, e)}
                            />
                          </div>
                          <div className='flex-grow'>
                            <div className='flex'>
                              <Link
                                to={`/${generateUrlName({ name: item.product.name, id: item._id })}`}
                                className='h-20 w-20 flex-shrink-0'
                              >
                                <img
                                  src={item.product.image}
                                  alt={item.product.name}
                                  className='object-contain w-full h-full'
                                />
                              </Link>
                              <div className='flex-grow px-2 pt-1 pb-2'>
                                <Link
                                  to={`/${generateUrlName({ name: item.product.name, id: item.product._id })}`}
                                  className='line-clamp-2'
                                >
                                  {item.product.name}
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className='col-span-6'>
                        <div className='grid grid-cols-5 items-center'>
                          <div className='col-span-2'>
                            <div className='flex items-center justify-center text-center'>
                              <div className='text-gray-500 line-through'>
                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                                  item.price_before_discount
                                )}
                              </div>
                              <div className='ml-3 font-medium'>
                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                                  item.price
                                )}
                              </div>
                            </div>
                          </div>
                          <div className='col-span-1 text-center'>
                            <InputQuantity
                              value={item.buy_count}
                              max={item.product.quantity}
                              classNameWrapper='flex justify-center'
                              onIncrease={(value) =>
                                quantityButtonHandler(index, value, value <= item.product.quantity)
                              }
                              onDecrease={(value) => quantityButtonHandler(index, value, value >= 1)}
                              onChangeNumber={(value) => changeNumberInputHandler(index, value)}
                              onFocusOut={(value) =>
                                quantityButtonHandler(
                                  index,
                                  value,
                                  value >= 1 &&
                                    value <= item.product.quantity &&
                                    value != (cartList as CartType[])[index].buy_count
                                )
                              }
                              disabled={item.disabled}
                            />
                          </div>
                          <div className='col-span-1 '>
                            <span className='text-center text-orange'>
                              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                                item.price * item.buy_count
                              )}
                            </span>
                          </div>
                          <div className='col-span-1 text-center'>
                            <button className='hover:text-orange' onClick={() => deleteHanlder(index)}>
                              Xóa
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className='sticky bottom-0 mt-10 pb-5 z-10 flex flex-col sm:flex-row sm:items-center justify-between bg-white'>
              <div className='flex items-center'>
                <div className='flex flex-shrink-0 items-center justify-center pr-5'>
                  <input
                    type='checkbox'
                    className='h-5 w-5 accent-orange'
                    checked={isCheckedAll}
                    onChange={checkedAllHanlder}
                  />
                </div>
                <button className='mx-3 capitalize' onClick={checkedAllHanlder}>
                  Chọn tất cả ({newCartList.length})
                </button>
                <button className='mx-3 capitalize' onClick={deleteProductsHanlder}>
                  Xóa
                </button>
              </div>
              <div className='flex items-center mt-5 sm:mt-0'>
                <div>Tổng thanh toán ({checkedProductList.length} sản phẩm):</div>
                <div className='ml-1 text-2xl text-orange'>
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice)}
                </div>
                <ButtonSubmit
                  onClick={buyProductHandler}
                  disabled={buyProduct.isPending}
                  className='px-9 py-3 mr-4 ml-5 w-52 capitalize font-light text-white text-sm rounded-sm bg-orange hover:opacity-90'
                >
                  Mua hàng
                </ButtonSubmit>
              </div>
            </div>
          </>
        ) : (
          <div className='text-center'>
            <img src={noProduct} alt='no purchase' className='mx-auto h-24 w-24' />
            <div className='font-bold text-gray-400 mt-5'>Giỏ hàng của bạn còn trống</div>
            <div className='mt-5 text-center'>
              <Link
                to='/'
                className=' bg-orange rounded-sm px-10 py-2 uppercase text-white transition-all hover:bg-orange/80'
              >
                Mua ngay
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
