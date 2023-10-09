import React from "react";

import { Input } from "common/input";
import { TokenWithSymbol } from "common/tokenWithSymbol";
import { useAppDispatch, useAppSelector } from "hooks";
import {
  OrderSide,
  orderInputSlice,
  validatePriceInput,
} from "redux/orderInputSlice";
import { AmountInput } from "./AmountInput";

export function LimitOrderInput() {
  const { price, side } = useAppSelector((state) => state.orderInput);
  const priceToken = useAppSelector((state) => state.pairSelector.token2);
  const validationResult = useAppSelector(validatePriceInput);
  const bestBuyPrice = useAppSelector((state) => state.orderBook.bestBuy);
  const bestSellPrice = useAppSelector((state) => state.orderBook.bestSell);
  const dispatch = useAppDispatch();

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const price = Number(event.target.value);
    dispatch(orderInputSlice.actions.setPrice(price));
  };

  return (
    <>
      <div className="form-control w-full">
        <AmountInput />
        <p className="text-left text-sm font-medium !mb-2">
          {side === OrderSide.BUY ? "Buy" : "Sell"} Price
        </p>
        <p
          className="text-left text-sm font-medium !mb-2 cursor-pointer"
          onClick={() =>
            dispatch(
              orderInputSlice.actions.setPrice(
                side === OrderSide.BUY ? bestBuyPrice || 0 : bestSellPrice || 0
              )
            )
          }
        >
          Best Price:{" "}
          <span
            className={
              "font-semibold " +
              (side === OrderSide.BUY ? "text-accent" : "text-error")
            }
          >
            {side === OrderSide.BUY ? bestBuyPrice : bestSellPrice}{" "}
            {priceToken.symbol}
          </span>
        </p>
        <Input
          type="number"
          value={price}
          onChange={handleOnChange}
          validation={validationResult}
          endAdornment={
            <TokenWithSymbol
              logoUrl={priceToken.iconUrl}
              symbol={priceToken.symbol}
            />
          }
        />
      </div>
    </>
  );
}
