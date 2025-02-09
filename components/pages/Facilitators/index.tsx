// "use client";

// import { EnvironmentOutlined, UserOutlined } from "@ant-design/icons";
// import pic from "@/public/images/ceoPic.png";
// import axiosInstance from "@/app/utils/axios-config";
// import { handleAxiosError } from "@/app/utils/axiosError";
// import { Card, Popover, Tag, Typography } from "antd";
// import Image from "next/image";
// import { useEffect, useState } from "react";

// const FacilitatorsPage = () => {
//   const [loading, setLoading] = useState(false);
//   const [facilitators, setFacilitators] = useState<any>();
//   const [eachFacilitator, setEachFacilitator] = useState<any>();

//   const fetchFacilitators = async () => {
//     try {
//       const res = await axiosInstance.get("/mentorships?status=accepted");
//       if (res.status) {
//         setFacilitators(res.data.data.mentorship);
//         // console.log("here is res", res);
//       }
//     } catch (error) {
//       // handleAxiosError(error);
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchFacilitators();
//   }, []);

//   // const facilitators = [
//   //   {
//   //     name: "Ahamefula Utom",
//   //     position: "Chief Executive Officer (CEO)",
//   //     industry: "IT",
//   //     country: "Germany",
//   //     image: (
//   //       <div className="flex justify-center items-center ">
//   //         <UserOutlined className="text-[12em]" />
//   //         {/* <Image src={pic} alt="CEO" /> */}
//   //       </div>
//   //     ),
//   //   },
//   // ];

//   const PopOverContent = (
//     <div className="flex lg:flex-row md:flex-row flex-col gap-8 p-4 lg:max-w-[700px] md:max-w-[700px] ">
//       <div className="flex justify-center items-center">
//         <Image
//           src={eachFacilitator?.mediaUrl}
//           alt="image"
//           width={100}
//           height={100}
//         />
//       </div>
//       <div className="lg:w-2/3 md:w-2/3 w-full">
//         <Typography.Paragraph className="text-purple-50 text-lg font-bold mb-0 mt-2">
//           {eachFacilitator?.firstname} {eachFacilitator?.lastname}
//         </Typography.Paragraph>
//         <Typography.Paragraph className="p-0 mb-0">
//           {eachFacilitator?.currentJobTitle}
//         </Typography.Paragraph>
//         <Typography.Paragraph className="p-0 italic text-gray-500">
//           <EnvironmentOutlined className="text-purple-50 font-bold pr-2" />
//           {eachFacilitator?.country}
//         </Typography.Paragraph>
//         <Typography.Paragraph>{eachFacilitator?.about}</Typography.Paragraph>
//         {/* Skills and Expertise */}
//         <div className="mt-2">
//           <Typography.Paragraph className="font-semibold text-gray-500 uppercase">
//             Skills & Expertises
//           </Typography.Paragraph>
//           <div>
//             {eachFacilitator &&
//               eachFacilitator.skills.map((skill: any) => {
//                 return (
//                   <Tag
//                     key={skill.id}
//                     className="text-[#5832DA] bg-[#D2C5FD] rounded-full border-none px-4 py-1 mt-2"
//                   >
//                     {skill.name}
//                   </Tag>
//                 );
//               })}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
//   return (
//     <div className="bg-grey-50">
//       <div className="bg-gray-500 p-6">
//         <Typography.Title level={2} className="text-white">
//           Mentors & Facilitators - Unifaires
//         </Typography.Title>
//       </div>
//       <div className="p-10">
//         <Typography.Paragraph className=" text-base text-red-500 font-medium">
//           The following business & digital technology leaders are Unifaires
//           Facilitators & Mentors
//         </Typography.Paragraph>

//         <section className="flex gap-6 flex-wrap justify-center items-center">
//           {facilitators &&
//             facilitators.map((facilitator: any) => {
//               return (
//                 <Popover key={facilitator.id} content={PopOverContent}>
//                   <Card
//                     hoverable
//                     cover={
//                       <Image
//                         src={eachFacilitator?.mediaUrl}
//                         alt="image"
//                         width={100}
//                         height={100}
//                         className="max-h-full"
//                       />
//                     }
//                     loading={loading}
//                     onMouseEnter={() => setEachFacilitator(facilitator)}
//                   >
//                     <Card.Meta
//                       title={`${facilitator.firstname} ${facilitator.lastname}`}
//                       description={facilitator.currentJobTitle}
//                       className="my-1"
//                     />
//                   </Card>
//                 </Popover>
//               );
//             })}
//         </section>
//       </div>
//     </div>
//   );
// };

// export default FacilitatorsPage;
