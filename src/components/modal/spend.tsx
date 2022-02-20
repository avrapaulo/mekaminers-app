import { Dispatch, Fragment, SetStateAction, useRef } from 'react'
import { useRecoilState } from 'recoil'
import { useMoralisCloudFunction } from 'react-moralis'
import toast from 'react-hot-toast'
import { Dialog, Transition } from '@headlessui/react'
import { userLandAtom, oreAtom } from 'recoil/atoms'
import { Notification } from 'components/notification'

interface SpendModelProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const landPrice = {
  4: { value: 10000, id: 1 },
  5: { value: 20000, id: 2 },
  6: { value: 30000, id: 3 }
}

export const SpendModel = ({ open, setOpen }: SpendModelProps) => {
  const [totalLand, setTotalLand] = useRecoilState(userLandAtom)
  const [oresAtom, setOresAtom] = useRecoilState(oreAtom)
  const { fetch } = useMoralisCloudFunction('buyItem', {}, { autoFetch: false })
  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900 flex flex-row"
                  >
                    Do you really want to buy this land for {landPrice[totalLand]?.value || 0}
                    <img alt="" className="h-6 w-6 object-contain" src="/ore.png" />?
                  </Dialog.Title>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-black text-base font-medium text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black sm:col-start-2 sm:text-sm"
                  onClick={() => {
                    fetch({
                      params: { item: 'upgradeLand' },
                      onSuccess: result => {
                        if (oresAtom < landPrice[totalLand]?.value) {
                          return toast.custom(
                            t => (
                              <Notification
                                onClickClose={() => toast.dismiss(t.id)}
                                isShow={t.visible}
                                icon="error"
                                title="Land"
                                description={
                                  <div className="flex flex-row items-center">
                                    You need more
                                    <img alt="" className="h-6 w-6 object-contain" src="/ore.png" />
                                  </div>
                                }
                              />
                            ),
                            { duration: 3000 }
                          )
                        }
                        if (result) {
                          setTotalLand(totalLand + 1)
                          setOresAtom(i => i - landPrice[totalLand]?.value)
                          toast.custom(
                            t => (
                              <Notification
                                onClickClose={() => toast.dismiss(t.id)}
                                isShow={t.visible}
                                icon="success"
                                title="Land"
                                description={
                                  <div className="flex flex-row items-center">
                                    <img alt="" className="h-6 w-6 object-contain" src="/ore.png" />
                                    <div className="text-red-500">
                                      -{landPrice[totalLand]?.value}
                                    </div>
                                  </div>
                                }
                              />
                            ),
                            { duration: 3000 }
                          )
                          setOpen(false)
                        } else {
                          toast.custom(
                            t => (
                              <Notification
                                onClickClose={() => toast.dismiss(t.id)}
                                isShow={t.visible}
                                icon="error"
                                title="Land"
                                description={
                                  <div className="flex flex-row items-center">Try later!</div>
                                }
                              />
                            ),
                            { duration: 3000 }
                          )
                        }
                      }
                    })
                  }}
                >
                  Yes!
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black sm:mt-0 sm:col-start-1 sm:text-sm"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
