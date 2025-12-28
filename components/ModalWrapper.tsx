"use client"

import dynamic from 'next/dynamic'

const DynamicModal = dynamic(() => import('@/components/Modal'), {
  ssr: false,
})

interface Props {
  productId: string
}

const ModalWrapper = ({ productId }: Props) => {
  return <DynamicModal productId={productId} />
}

export default ModalWrapper