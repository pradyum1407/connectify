

const Chatheader = ({selectedUser}) => {

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
          </div>
        </div>

      </div>
    </div>
    )
}

export default Chatheader