import React from 'react'

function SetTitle({title}) {
  return (
    <div className="w-1/3">
          <div className="border-b pb-2">
            <h1 className="font-semibold text-zinc-800 text-center">
              {title}
            </h1>
          </div>
        </div>
  )
}

export default SetTitle
