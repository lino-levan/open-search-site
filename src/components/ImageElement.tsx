import { useState } from "react";

export interface IImage {
  alt: string
  src: string
  href: string
  title: string
  height: number
  width: number
}

function ImageElement({result}: {result: IImage}) {
  const title = result.alt || result.title
  const link = result.href

  return (
    <div className="p-2">
      <img src={result.src} alt={result.alt} height={100} width={result.width * (100/result.height)} style={{imageRendering:result.height<100 ?'crisp-edges' : 'auto'}}/>
      <p className="text-sm">{title.length < 30 ? title : `${title.slice(0, 27)}...`}</p>
      <a href={result.href} className="text-xxs py-0 text-slate-500">{link.length < 30 ? link : `${link.slice(0, 27)}...`}</a>
    </div>
  )
}

export default ImageElement
