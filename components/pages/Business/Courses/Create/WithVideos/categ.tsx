// import React, { Fragment, useState, useEffect, useRef } from "react";

// import {
//   Button,
//   Card,
//   Col,
//   Divider,
//   Form,
//   Input,
//   Row,
//   Select,
//   Checkbox,
//   Typography,
// } from "antd";
// import {
//   PlusOutlined,
//   CloseOutlined,
//   SafetyCertificateOutlined,
//   MailOutlined,
// } from "@ant-design/icons";
// import config from "@src/utils/config";
// import axios from "axios";

// interface ICategoryObject {
//   id: number;
//   name: string;
//   children: Array<object> | null;
// }

// const Categ = () => {
//   const { Search } = Input;
//   const onSearch = (value: string) => console.log(value);
//   const onChange = (e) => {
//     console.log(`checked = ${e.target.checked}`);
//   };

//   const currentCategory = useRef(null);

//   const [categories, setCategories] = useState<Array<ICategoryObject> | null>(
//     null
//   );
//   const [childrenCategories, setChildrenCategories] =
//     useState<Array<ICategoryObject> | null>(null);

//   useEffect(() => {
//     axios
//       .get(`${config.API.API_URL}/category`)
//       .then((res) => {
//         console.log(res.data.data);
//         setCategories(res.data.data);
//       })
//       .catch((e) => {});
//   }, []);

//   const handleFetchChildren = async (id) => {
//     axios
//       .get(`${config.API.API_URL}/category/${id}`)
//       .then((res) => {
//         setChildrenCategories(res.data.data);

//         console.log(res.data.data.children);
//       })
//       .catch((e) => {});
//   };

//   const elementRefs: any = {};

//   const showChildCategory = (e, parentId: any) => {
//     handleFetchChildren(parentId);
//     const element = elementRefs[parentId];
//     console.log(element);
//     console.log(e.target.parentElement);
//     console.log(parentId);

//     // const newElement = document.createElement("div");
//     // newElement.innerText = "Lorem Ipsum";
//     // element.appendChild(newElement);
//   };
//   return (
//     <Fragment>
//       <Card>
//         <Typography.Title level={3}>Select Category</Typography.Title>
//         <Divider className="mt-0" />
//         <div>
//           <div>
//             {categories?.map((category) => {
//               return (
//                 <div key={category.id} className="p-4 rounded-md">
//                   <Typography.Paragraph className="font-bold text-lg">
//                     {category.name}
//                   </Typography.Paragraph>
//                   <Search
//                     className="w-[37%] text-[12px]"
//                     placeholder={`Search ${category.name}`}
//                     onSearch={onSearch}
//                   />

//                   <div className="flex flex-col ml-4 mb-4">
//                     {category.children?.map((children) => {
//                       return (
//                         <div key={children?.id}>
//                           <div
//                             id={`myElement-${children?.id}`}
//                             ref={(el) => (elementRefs[children?.id] = el)}
//                             className="flex flex-row gap-4 pt-4"
//                           >
//                             <Checkbox onChange={onChange}>
//                               {children?.name}
//                             </Checkbox>
//                             {/* {console.log(children)} */}
//                             {children?.children && (
//                               <PlusOutlined
//                                 className="cursor-pointer text-blue-800"
//                                 onClick={(e) => {
//                                   showChildCategory(e, children?.id);
//                                 }}
//                               />
//                             )}
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </Card>
//     </Fragment>
//   );
// };

// export default Categ;
