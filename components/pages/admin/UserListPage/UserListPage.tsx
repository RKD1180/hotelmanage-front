"use client";
import { Suspense, useCallback, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Modal from "@/components/common/Modal";
import { getAllUsers } from "@/services/auth";

export type User = {
  _id: string;
  username: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};

type UserListProps = {
  users: User[];
};

export default function UserListPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalData, setModalData] = useState<{
    title: string;
    component: React.ReactNode;
  } | null>(null);

  // Function to fetch users data with pagination
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getAllUsers();
      setUsers(data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(); // Load users on initial render
  }, []);

  const closeModals = useCallback(() => {
    setModalData(null);
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Manage Users</h1>
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <Table>
            <TableCaption>A list of registered users.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>SL</TableHead>
                <TableHead>ID</TableHead>
                <TableHead className="w-[200px]">Username</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user, idx) => (
                <TableRow key={user._id}>
                  <TableCell className="font-medium">{idx + 1}</TableCell>
                  <TableCell className="font-medium">{user._id}</TableCell>
                  <TableCell className="font-medium">{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {modalData && (
        <Modal
          isOpen={!!modalData}
          closeModal={closeModals}
          title={modalData.title}
          dialogClass="w-[50%]"
        >
          {modalData.component}
        </Modal>
      )}
    </Suspense>
  );
}
