// import { Checkbox, Space } from "antd";
// // import useCardContext from "@src/components/pages/User/Dashboard/components/SidebarCards/Context/SidebarContext";

// interface listDataProps {
//   listData: {
//     value: string;
//     defaultChecked: boolean;
//   }[];
// }

// const CheckBoxList = ({ listData }: listDataProps) => {
//   // const { addCheckedboxItemHandler } = useCardContext();

//   // const checkBoxHandler = (item: string) => {
//   //   addCheckedboxItemHandler(item);
//   //   console.log(item);
//   // };

//   const sharedStyle: React.CSSProperties = {
//     color: "red",
//     marginBottom: 16,
//   };

//   return (
//     <>
//       <Space style={sharedStyle} direction="vertical" className="gap-2">
//         {listData.map((data) => (
//           <Checkbox
//             key={data.value}
//             value={data.value}
//             defaultChecked={data.defaultChecked}
//             // onClick={() => checkBoxHandler(data.value)}
//             className="text-gray-[#808080] font-Montserrat opacity-90 text-sm"
//           >
//             {data.value}
//           </Checkbox>
//         ))}
//       </Space>
//     </>
//   );
// };

// export default CheckBoxList;
