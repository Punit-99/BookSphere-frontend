// path: src/pages/AuthLayout.tsx

import Login from "./Login";
import Register from "./Register";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AuthLayout = ({ close }: { close?: () => void }) => {
  return (
    <div className="w-full flex justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Get ready to book your favorite movies!</CardTitle>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="login">
            <TabsList className="grid grid-cols-2 mb-4 w-full">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <Login onSuccess={close} />
            </TabsContent>

            <TabsContent value="register">
              <Register onSuccess={close} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthLayout;