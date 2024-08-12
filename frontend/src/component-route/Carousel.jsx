import React from "react";
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import InnerTaskCard from "./InnerTaskCard";
 
export function CarouselOrientation() {
  const task = [{
    title: "Water Indoor Plants",
    description: "Water all indoor plants, focusing on the ones by the windowsill and the corner shelf.",
  },
  {
    title: "Grocery Run",
    description: "Pick up fresh vegetables, bread, and milk from the grocery store.",
  },
  {
    title: "Organize Desk",
    description: "Clear off old papers and tidy up the workspace to keep things organized for the week.",
  }
]
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      orientation="vertical"
      className="w-full"
    >
      <CarouselContent className="-mt-1 h-[200px] w-full">
        {Array.from({ length: 3 }).map((_, index) => (
          <CarouselItem key={index} className="pt-12 pb-12 pl-5 pr-5 md:basis-1/2">
            <div className="p-2">
              <Card>
                <CardContent className="flex items-center justify-center p-2">
                  <InnerTaskCard content = {task[index]}/>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}