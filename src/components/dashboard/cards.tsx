"use client";
import React from "react";

import {useUser} from "./provider";

import {Card as CardType} from "@/db/types";
import {useCards} from "@/lib/hooks/use-cards";
import {getCardColor} from "@/lib/utils";
import {Carousel, CarouselContent, CarouselItem} from "@/components/ui/carousel";
import {Card, CardContent} from "@/components/ui/card";

export function Cards() {
  const {cards, isLoading: isLoadingCards, error} = useCards();
  const {user_details} = useUser();

  return (
    <section className="mt-4 px-4">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          Hola, {user_details?.name?.length ? user_details.name : user_details?.username}{" "}
        </h2>
      </div>

      {isLoadingCards ? (
        <div className="flex h-52 items-center justify-center">
          <div className="border-brand-primary h-8 w-8 animate-spin rounded-full border-b-2" />
        </div>
      ) : error ? (
        <div className="flex h-52 items-center justify-center text-red-500">{error}</div>
      ) : (
        <Carousel className="w-full">
          <CarouselContent>
            {cards.map((card: CardType) => (
              <CarouselItem key={card.id} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-2">
                  <Card
                    className={`h-52 w-full rounded-2xl bg-gradient-to-br ${getCardColor(
                      card.issuer,
                    )} text-white shadow-lg`}
                  >
                    <CardContent className="flex !h-full flex-col !justify-between p-5">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-xs opacity-80">Current Balance</p>
                          <p className="text-2xl font-bold">
                            ${Number.parseFloat(card.balance).toLocaleString()}
                          </p>
                        </div>
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                          {card.issuer === "Visa" ? "V" : "M"}
                        </div>
                      </div>

                      <div>
                        <p className="mb-1 text-sm opacity-80">**** **** **** {card.lastDigits}</p>
                        <div className="flex items-center justify-between">
                          <p className="text-xs opacity-80">{card.name}</p>
                          <p className="text-xs opacity-80">Exp: {card.expDate}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      )}
    </section>
  );
}
