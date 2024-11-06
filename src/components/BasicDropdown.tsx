import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export default function BasicDropdown({ label = "Open", menuData }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          {label}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full">
        {menuData.map((group, groupIndex) => (
          <div key={groupIndex} className="w-full">
            {group.label && (
              <DropdownMenuLabel>{group.label}</DropdownMenuLabel>
            )}
            {groupIndex > 0 && <DropdownMenuSeparator />}
            <DropdownMenuGroup>
              {group.items.map((item, itemIndex) =>
                item.subItems ? (
                  <DropdownMenuSub key={itemIndex}>
                    <DropdownMenuSubTrigger>
                      {item.label}
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        {item.subItems.map((subItem, subItemIndex) => (
                          <DropdownMenuItem key={subItemIndex}>
                            {subItem.label}
                          </DropdownMenuItem>
                        ))}
                        {item.subItems.length > 1 && <DropdownMenuSeparator />}
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                ) : (
                  <DropdownMenuItem key={itemIndex} disabled={item.disabled}>
                    {item.label}
                    {item.shortcut && (
                      <DropdownMenuShortcut>
                        {item.shortcut}
                      </DropdownMenuShortcut>
                    )}
                  </DropdownMenuItem>
                )
              )}
            </DropdownMenuGroup>
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
