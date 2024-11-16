"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

export function CreateShipmentProfile() {
  const [name, setName] = useState("");

  const createShipmentProfile = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const response = await axios.post(
        "/api/shipment-profile",
        { name },
        config
      );
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error creating address book entry:", error);
      toast.error("An error occurred");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Create New Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Shipment Profile</DialogTitle>
          <DialogDescription>
            The shipment profile used to store your shipment information.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            onChange={(e) => setName(e.target.value)}
            className="col-span-3"
            placeholder="Enter shipment profile name"
          />
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={() => {
              createShipmentProfile();
            }}
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
