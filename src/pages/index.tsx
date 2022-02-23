import { useMoralisCloudFunction } from 'react-moralis'
import { UserGroupIcon } from '@heroicons/react/outline'
import { DiscordIconOriginal } from 'icons'
import { event } from 'lib/ga'

const Homepage = () => {
  const { data: dataTotalUsers } = useMoralisCloudFunction('getTotalUsers')
  const { data: dataTotalMintedRobots } = useMoralisCloudFunction('getTotalMintedRobots')
  const { data: dataTotalMintedPieces } = useMoralisCloudFunction('getTotalMintedPieces')
  const { data: dataTotalBurn } = useMoralisCloudFunction('getTotalBurn')

  return (
    <div className="h-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 lg:h-full">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mt-3 lg:mt-0">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <UserGroupIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm text-gray-500 truncate font-bold">Players</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {(dataTotalUsers as any)?.total}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img alt="" className="h-8 w-8 object-contain" src="/box-meka.png" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm text-gray-500 truncate font-bold">Total Robots</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {(dataTotalMintedRobots as any)?.totalRobots?.count}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img alt="" className="h-8 w-8 object-contain" src="/pieceshards.png" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm text-gray-500 truncate font-bold">Total Pieces</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {(dataTotalMintedPieces as any)?.totalPieces?.count}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img alt="" className="h-8 w-8 object-contain" src="/ore.png" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm text-gray-500 truncate font-bold">
                      Ores used by Players
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {Math.round(dataTotalBurn?.[0]?.total || 0)}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        <a
          className="uppercase flex justify-center items-center text-white text-4xl font-bold  cursor-pointer relative lg:h-full mt-5 lg:-mt-24"
          href="https://discord.gg/2wsCx2Vn2R"
          target="_blank"
          rel="noreferrer"
          onClick={() =>
            event({
              action: 'join-discord',
              category: 'join-discord',
              value: 'join-discord',
              label: 'join-discord'
            })
          }
        >
          <div>Have doubts? Join us on Discord</div>
          <div>
            <DiscordIconOriginal className="h-16 w-16 relative" />
          </div>
        </a>
      </div>
    </div>
  )
}

export default Homepage
