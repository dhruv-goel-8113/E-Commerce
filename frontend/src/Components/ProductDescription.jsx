

export const ProductDescription = (props) => {
  const {product}=props;
  return (
    <div className="mt-20">
        <div className="flex gap-3 mb-4">
            <button className="btn_dark_rounded !rounded-none !text-xs !py-[6px] w-36">Description</button>
            <button className="btn_dark_outline !rounded-none !text-xs !py-[6px] w-36">Care Guide</button>
            <button className="btn_dark_outline !rounded-none !text-xs !py-[6px] w-36">Size Guide</button>
        </div>
        <div className="flex flex-col pb-16">
            <p className="text-sm">{product.description}</p>
        </div>
    </div>
  )
}
