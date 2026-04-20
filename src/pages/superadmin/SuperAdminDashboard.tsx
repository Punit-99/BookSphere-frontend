import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchAdmins, updateUserApproval } from "@/store/user/usersSlice";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AppSkeleton from "@/components/common/AppSkeleton";

const SuperAdminDashboard = () => {
  const dispatch = useDispatch();
  const { users: admins, loading } = useSelector((state: any) => state.users);

  useEffect(() => {
    dispatch(fetchAdmins() as any);
  }, [dispatch]);

  if (loading) {
    return (
      <div className="grid grid-cols-4 gap-4">
        <AppSkeleton variant="row" count={8} />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Admin Approvals</h1>

      {admins.length === 0 ? (
        <p>No admins found</p>
      ) : (
        admins.map((admin: any) => (
          <Card key={admin.id}>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="font-semibold">{admin.name}</p>
                <p className="text-sm text-muted-foreground">{admin.email}</p>
              </div>

              <Button
                onClick={() => dispatch(updateUserApproval(admin.id))}
                variant={admin.isApproved ? "secondary" : "default"}
              >
                {admin.isApproved ? "Disapprove" : "Approve"}
              </Button>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default SuperAdminDashboard;
