import { useState } from "react";

//render prop components.
export default function Currency() {

  return (
    <div>
      <Amount currency={{ name: "Euro", component: Euro }} />
      <Amount currency={{ name: "Pound", component: Pound }} />
    </div>
  );
}
const Euro = ({ amount}) => <p className="font-bold">Euro: {(amount * 0.95).toFixed(2)} </p>;
const Pound = ({ amount }) => <p className="font-bold" >Pound: {(amount * 0.95).toFixed(2)} </p>;

const Amount = ({ currency }) => {
  const [amount, setAmount] = useState(0);
  const CurrencyComponent = currency.component;

  return (
    <>
      <h1>US Dollar to {currency.name}</h1>
      <Button onClick={() => setAmount(amount + 1)}>+</Button>
      <Button disabled={amount === 0} onClick={() => setAmount(amount - 1)}>-</Button>

      <p className="font-bold">US Dollar: {amount}</p>
      <CurrencyComponent amount={amount}/>
    </>
  );
};

const Button=({children, ...others})=>{
    return(
        <button className="btn btn-neutral mr-2" {...others} >{children}</button>
    )
}
