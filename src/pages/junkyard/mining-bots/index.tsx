import { useRecoilState } from 'recoil'
import { useMoralisCloudFunction } from 'react-moralis'
import toast from 'react-hot-toast'
import { Notification } from 'components/notification'
import { Functional, Heavy, Rusty } from 'components/3D/mining-bots'
import { Card } from 'components/card'
import { oreAtom } from 'recoil/atoms'
import { Layout } from 'components/inventory'
import { MiniHeader } from 'components/inventory/header-mini'
import { junkyard } from 'constants/menu'

const MiningBots = () => {
  const { fetch } = useMoralisCloudFunction('buyItem', {}, { autoFetch: false })
  const [oresAtom, setOresAtom] = useRecoilState(oreAtom)

  return (
    <>
      <MiniHeader menu={junkyard} />
      <Layout>
        <>
          <Card description="Heavy" imageCard={<Heavy />}>
            <div className="flex items-center justify-center my-5">
              <button
                type="button"
                className="flex justify-center items-center py-2 border border-transparent text-lg font-semibold rounded-xl shadow-sm text-black bg-white hover:bg-gray-200 w-28"
                onClick={() =>
                  fetch({
                    params: { item: 'heavy' },
                    onSuccess: result => {
                      if (oresAtom < 100) {
                        return toast.custom(
                          t => (
                            <Notification
                              isShow={t.visible}
                              icon="error"
                              title="Heavy"
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
                              title="Heavy"
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
                              title="Heavy"
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
          <Card description="Functional" imageCard={<Functional />}>
            <div className="flex items-center justify-center my-5">
              <button
                type="button"
                className="flex justify-center items-center py-2 border border-transparent text-lg font-semibold rounded-xl shadow-sm text-black bg-white hover:bg-gray-200 w-28"
                onClick={() =>
                  fetch({
                    params: { item: 'functional' },
                    onSuccess: result => {
                      if (oresAtom < 150) {
                        return toast.custom(
                          t => (
                            <Notification
                              isShow={t.visible}
                              icon="error"
                              title="Functional"
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
                              title="Functional"
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
                              title="Functional"
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
          <Card description="Rusty" imageCard={<Rusty />}>
            <div className="flex items-center justify-center my-5">
              <button
                type="button"
                className="flex justify-center items-center py-2 border border-transparent text-lg font-semibold rounded-xl shadow-sm text-black bg-white hover:bg-gray-200 w-28"
                onClick={() =>
                  fetch({
                    params: { item: 'rusty' },
                    onSuccess: result => {
                      if (oresAtom < 250) {
                        return toast.custom(
                          t => (
                            <Notification
                              isShow={t.visible}
                              icon="error"
                              title="Rusty"
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
                              title="Rusty"
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
                              title="Rusty"
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
        </>
      </Layout>
    </>
  )
}

export default MiningBots
