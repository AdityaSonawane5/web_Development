import { Badge } from './ui/badge';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import React from 'react';

const AppliedJobTable = () => {
  return (
    <div className="overflow-x-auto p-4 shadow-lg rounded-2xl bg-white">
      <Table className="w-full border border-gray-200">
        <TableCaption className="text-lg font-semibold">List of Applied Jobs</TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="p-4">Date</TableHead>
            <TableHead className="p-4">Job Role</TableHead>
            <TableHead className="p-4">Company</TableHead>
            <TableHead className="text-right p-4">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[1, 2].map((item, index) => (
            <TableRow key={index} className="hover:bg-gray-50">
              <TableCell className="p-4">17-07-2025</TableCell>
              <TableCell className="p-4">Frontend Developer</TableCell>
              <TableCell className="p-4">Google</TableCell>
              <TableCell className="text-right p-4">
                <Badge className="bg-green-500 text-white">Selected</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;



// import { Badge } from './ui/badge'
// import { Table, TableBody, TableCaption, TableCell, TableHead, TableRow } from './ui/table'
// import React from 'react'

// const AppliedJobTable = () => {
//   return (
//     <div>
//         <Table>
//             <TableCaption>List of Applied jobs</TableCaption>
//             <TableHead>
//                 <TableRow>
//                     <TableHead>Date</TableHead>
//                     <TableHead>Job Role</TableHead>
//                     <TableHead>Company</TableHead>
//                     <TableHead className="text-right">Status</TableHead>
//                 </TableRow>
//             </TableHead>
//             <TableBody>
//                 {
//                     [1,2].map((Item,index)=>(
//                         <TableRow key={index}>
//                             <TableCell>17-07-2025</TableCell>
//                             <TableCell>Frontend Developer</TableCell>
//                             <TableCell>Google</TableCell>
//                             <TableCell className="text-right"><Badge>Selected</Badge> </TableCell>
//                         </TableRow>
//                     ))
//                 }
//             </TableBody>
//         </Table>
      
//     </div>
//   )
// }

// export default AppliedJobTable