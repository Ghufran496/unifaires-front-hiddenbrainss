import React from "react";
import Link from "next/link";

function DashboardCards(props: any) {
  return (
    <div className="grow grid grid-cols-3 gap-[20px] mb-[100px] max-[1225px]:grid-cols-2 max-[768px]:grid-cols-1 max-[830px]:mb-[50px]">
      {props.data.map(function (data: any, index: any) {
        return (
          <Link href={`/user/${data.link}`} key={index}>
            <div className="text-center hover:shadow-2xl cursor-pointer h-full px-[30px] py-[30px] rounded-[5px] bg-white">
              <div className="mb-[15px]">{data.icon}</div>
              <h2 className="text-[1.25rem] font-semibold leading-none mb-[15px]">
                {data.title}
              </h2>
              <p className="">{data.text}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default DashboardCards;
