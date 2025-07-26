import React from 'react'

export default function CommentsHover(props:any) {
  return (
  <div className="absolute bottom-5 right-11 bg-white shadow-xl border border-gray-200 p-3 rounded-lg w-60 overflow-y-auto max-h-[200px]">
  {props.commentsTxt}
</div>
  )
}
