import { useRecoilState } from 'recoil'
import { useMoralisCloudFunction } from 'react-moralis'
import toast from 'react-hot-toast'
import { Notification } from 'components/notification'
import { Card } from 'components/card'
import { oreAtom } from 'recoil/atoms'
import { Layout } from 'components/inventory'
import { MiniHeader } from 'components/inventory/header-mini'
import { junkyard } from 'constants/menu'

const Utilities = () => {
  const { fetch } = useMoralisCloudFunction('buyItem', {}, { autoFetch: false })
  const [oresAtom, setOresAtom] = useRecoilState(oreAtom)

  return (
    <>
      <MiniHeader menu={junkyard} />
      <Layout>
        <>
          <Card
            description="Oil x10"
            imageCard={<img alt="" className="h-full w-full object-contain" src="/oil.png" />}
          >
            <div className="flex items-center justify-center my-5">
              <button
                type="button"
                className="flex justify-center items-center py-2 border border-transparent text-lg font-semibold rounded-xl shadow-sm text-black bg-white hover:bg-gray-200 w-28"
                onClick={() =>
                  fetch({
                    params: { item: 'oil' },
                    onSuccess: result => {
                      if (oresAtom < 100) {
                        return toast.custom(
                          t => (
                            <Notification
                              isShow={t.visible}
                              icon="error"
                              title="Oil"
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
                        setOresAtom(i => i - 100)
                        toast.custom(
                          t => (
                            <Notification
                              isShow={t.visible}
                              icon="success"
                              title="Oil"
                              description={
                                <div className="flex flex-row items-center">
                                  <img alt="" className="h-6 w-6 object-contain" src="/ore.png" />
                                  <div className="text-red-500">-100</div>
                                </div>
                              }
                            />
                          ),
                          { duration: 3000 }
                        )
                      } else {
                        toast.custom(
                          t => (
                            <Notification
                              isShow={t.visible}
                              icon="error"
                              title="Oil"
                              description={
                                <div className="flex flex-row items-center">Limit reached</div>
                              }
                            />
                          ),
                          { duration: 3000 }
                        )
                      }
                    }
                  })
                }
              >
                <img alt="" className="h-6 w-6 object-contain" src="/ore.png" /> 100
              </button>
            </div>
          </Card>
          <Card
            description="Toolkit"
            imageCard={<img alt="" className="h-full w-full object-contain" src="/toolkit.png" />}
          >
            <div className="flex items-center justify-center my-5">
              <button
                type="button"
                className="flex justify-center items-center py-2 border border-transparent text-lg font-semibold rounded-xl shadow-sm text-black bg-white hover:bg-gray-200 w-28"
                onClick={() =>
                  fetch({
                    params: { item: 'toolkit' },
                    onSuccess: result => {
                      if (oresAtom < 150) {
                        return toast.custom(
                          t => (
                            <Notification
                              isShow={t.visible}
                              icon="error"
                              title="Toolkit"
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
                        setOresAtom(i => i - 150)
                        toast.custom(
                          t => (
                            <Notification
                              isShow={t.visible}
                              icon="success"
                              title="Toolkit"
                              description={
                                <div className="flex flex-row items-center">
                                  <img alt="" className="h-6 w-6 object-contain" src="/ore.png" />
                                  <div className="text-red-500">-150</div>
                                </div>
                              }
                            />
                          ),
                          { duration: 3000 }
                        )
                      } else {
                        toast.custom(
                          t => (
                            <Notification
                              isShow={t.visible}
                              icon="error"
                              title="Toolkit"
                              description={
                                <div className="flex flex-row items-center">Limit reached</div>
                              }
                            />
                          ),
                          { duration: 3000 }
                        )
                      }
                    }
                  })
                }
              >
                <img alt="" className="h-6 w-6 object-contain" src="/ore.png" /> 150
              </button>
            </div>
          </Card>
          <Card description="Bug" imageCard={<img alt="" className="p-5" src="/bug.png" />}>
            <div className="flex items-center justify-center my-5">
              <button
                type="button"
                className="flex justify-center items-center py-2 border border-transparent text-lg font-semibold rounded-xl shadow-sm text-black bg-white hover:bg-gray-200 w-28"
                onClick={() =>
                  fetch({
                    params: { item: 'bug' },
                    onSuccess: result => {
                      if (oresAtom < 100) {
                        return toast.custom(
                          t => (
                            <Notification
                              isShow={t.visible}
                              icon="error"
                              title="Bug"
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
                        setOresAtom(i => i - 100)
                        toast.custom(
                          t => (
                            <Notification
                              isShow={t.visible}
                              icon="success"
                              title="Bug"
                              description={
                                <div className="flex flex-row items-center">
                                  <img alt="" className="h-6 w-6 object-contain" src="/ore.png" />
                                  <div className="text-red-500">-100</div>
                                </div>
                              }
                            />
                          ),
                          { duration: 3000 }
                        )
                      } else {
                        toast.custom(
                          t => (
                            <Notification
                              isShow={t.visible}
                              icon="error"
                              title="Bug"
                              description={
                                <div className="flex flex-row items-center">Limit reached</div>
                              }
                            />
                          ),
                          { duration: 3000 }
                        )
                      }
                    }
                  })
                }
              >
                <img alt="" className="h-6 w-6 object-contain" src="/ore.png" /> 100
              </button>
            </div>
          </Card>
          <Card description="Frog" imageCard={<img alt="" className="p-5" src="/frog.png" />}>
            <div className="flex items-center justify-center my-5">
              <button
                type="button"
                className="flex justify-center items-center py-2 border border-transparent text-lg font-semibold rounded-xl shadow-sm text-black bg-white hover:bg-gray-200 w-28"
                onClick={() =>
                  fetch({
                    params: { item: 'frog' },
                    onSuccess: result => {
                      if (oresAtom < 250) {
                        return toast.custom(
                          t => (
                            <Notification
                              isShow={t.visible}
                              icon="error"
                              title="Frog"
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
                        setOresAtom(i => i - 250)
                        toast.custom(
                          t => (
                            <Notification
                              isShow={t.visible}
                              icon="success"
                              title="Frog"
                              description={
                                <div className="flex flex-row items-center">
                                  <img alt="" className="h-6 w-6 object-contain" src="/ore.png" />
                                  <div className="text-red-500">-250</div>
                                </div>
                              }
                            />
                          ),
                          { duration: 3000 }
                        )
                      } else {
                        toast.custom(
                          t => (
                            <Notification
                              isShow={t.visible}
                              icon="error"
                              title="Frog"
                              description={
                                <div className="flex flex-row items-center">Limit reached</div>
                              }
                            />
                          ),
                          { duration: 3000 }
                        )
                      }
                    }
                  })
                }
              >
                <img alt="" className="h-6 w-6 object-contain" src="/ore.png" /> 250
              </button>
            </div>
          </Card>
          <Card description="Dog" imageCard={<img alt="" className="p-5" src="/dog.png" />}>
            <div className="flex items-center justify-center my-5">
              <button
                type="button"
                className="flex justify-center items-center py-2 border border-transparent text-lg font-semibold rounded-xl shadow-sm text-black bg-white hover:bg-gray-200 w-28"
                onClick={() =>
                  fetch({
                    params: { item: 'dog' },
                    onSuccess: result => {
                      if (oresAtom < 500) {
                        return toast.custom(
                          t => (
                            <Notification
                              isShow={t.visible}
                              icon="error"
                              title="Dog"
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
                        setOresAtom(i => i - 500)
                        toast.custom(
                          t => (
                            <Notification
                              isShow={t.visible}
                              icon="success"
                              title="Dog"
                              description={
                                <div className="flex flex-row items-center">
                                  <img alt="" className="h-6 w-6 object-contain" src="/ore.png" />
                                  <div className="text-red-500">-500</div>
                                </div>
                              }
                            />
                          ),
                          { duration: 3000 }
                        )
                      } else {
                        toast.custom(
                          t => (
                            <Notification
                              isShow={t.visible}
                              icon="error"
                              title="Dog"
                              description={
                                <div className="flex flex-row items-center">Limit reached</div>
                              }
                            />
                          ),
                          { duration: 3000 }
                        )
                      }
                    }
                  })
                }
              >
                <img alt="" className="h-6 w-6 object-contain" src="/ore.png" /> 500
              </button>
            </div>
          </Card>
        </>
      </Layout>
    </>
  )
}

export default Utilities
