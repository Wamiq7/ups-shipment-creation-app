"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import axios from "axios";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateDataState } from "@/redux/dataSlice";

export function Combobox() {
  const dispatch = useAppDispatch();
  const shipmentData = useAppSelector((state) => state.data.from);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(
    shipmentData.senderAddressLine || ""
  );
  const [suggestions, setSuggestions] = React.useState<any>([]);
  const [typedQuery, setTypedQuery] = React.useState("");

  const handleSearch = async (query: string) => {
    setTypedQuery(query);
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(
        `/api/address-book/search-from?query=${query}`
      );
      setSuggestions(response.data.data || []);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value ? value : "Select Address..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput
            placeholder="Search address..."
            className="h-9"
            onValueChange={(query) => {
              handleSearch(query);
            }}
          />
          <CommandList>
            {suggestions.length === 0 && typedQuery ? (
              <CommandItem
                onSelect={() => {
                  setValue(typedQuery);
                  dispatch(
                    updateDataState({
                      path: ["from"],
                      updates: {
                        senderAddressLine: typedQuery,
                      },
                    })
                  );
                  setOpen(false);
                }}
              >
                {`Use "${typedQuery}"`}
              </CommandItem>
            ) : (
              <>
                <CommandEmpty>No item found.</CommandEmpty>
                <CommandGroup>
                  {suggestions?.map((item, index) => (
                    <CommandItem
                      key={index}
                      value={item.value}
                      onSelect={(currentValue) => {
                        setValue(currentValue);
                        dispatch(
                          updateDataState({
                            path: ["from"],
                            updates: {
                              senderAddressLine: currentValue,
                            },
                          })
                        );
                        setOpen(false);
                      }}
                    >
                      {item.label}
                      <Check
                        className={cn(
                          "ml-auto",
                          value === item.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
