import { useSocketStore } from "../store/useSocketStore"

const Chatheader = ({ selectedUser }) => {
  const { onlineUsers } = useSocketStore()

  return (
    <div className="p-3 sm:p-4 border-b border-base-300 bg-base-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Avatar */}
          <div className="avatar">
            <div className="w-10 sm:w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={selectedUser.profilePic} alt={selectedUser.fullname} />
            </div>
          </div>

          {/* User Info */}
          <div>
            <h3 className="font-semibold text-base sm:text-lg">{selectedUser.fullname}</h3>

            <span className={onlineUsers.includes(selectedUser._id) ? "text-green-500" : "text-gray-400"}>
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </span>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Chatheader