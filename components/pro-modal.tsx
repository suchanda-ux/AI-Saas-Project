"use client";

import {
  Check,
  Code,
  ImageIcon,
  MessageSquare,
  Music,
  VideoIcon,
  Zap,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useProModal } from "@/hooks/use-pro-model";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const tools = [
  {
    label: "Conversation",
    icon: MessageSquare,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    label: "Music Generation",
    icon: Music,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    color: "text-orange-700",
    bgColor: "bg-orange-700/10",
  },
  {
    label: "Code Generation",
    icon: Code,
    color: "text-green-700",
    bgColor: "bg-green-700/10",
  },
];

export const ProModal = () => {
  const proModal = useProModal();
  const [loading, setLoading] = useState(false);

  const onSubscribe = async () => {
    try {
      setLoading(true);

      const response = await axios.get("/api/stripe");

      window.location.href = response.data.url;
    } catch (error) {
      console.log(error, "STRIPE_CLIENT_ERROR");
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex flex-col items-center justify-center gap-y-4 pb-2">
            <div className="flex items-center gap-x-2 font-bold py-1">
              Upgrade to Genius
              <Badge variant="premium" className="uppercase text-sm py-1">
                pro
              </Badge>
            </div>
          </DialogTitle>

          <DialogDescription className="text-center text-zinc-900 font-medium">
            Unlock all premium tools with Genius Pro.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2 pt-4">
          {tools.map((tool) => (
            <Card key={tool.label} className="border-black/5 p-3">
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-x-4">
                  <div className={cn("rounded-md p-2", tool.bgColor)}>
                    <tool.icon className={cn("h-6 w-6", tool.color)} />
                  </div>

                  <div className="text-sm font-semibold">{tool.label}</div>
                </div>

                <Check className="h-5 w-5 shrink-0 text-primary" />
              </div>
            </Card>
          ))}
        </div>

        <DialogFooter>
          <Button disabled={loading} onClick={onSubscribe} size="lg" variant="premium" className="w-full">
            Upgrade
            <Zap className="ml-2 h-4 w-4 fill-white" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};