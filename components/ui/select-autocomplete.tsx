import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";

export type SelectAutocompleteGroup = {
  label?: string;
  items: React.ReactNode[];
};

export const SelectAutocomplete = ({
  groups,
}: {
  groups: SelectAutocompleteGroup[];
}) => {
  return (
    <Command>
      <CommandInput placeholder="Tapez pour rechercher ..." />
      <CommandList>
        <CommandEmpty>Aucun résultat.</CommandEmpty>
        {groups.map((group, indexGroup) => (
          <CommandGroup key={indexGroup} heading={group.label || ""}>
            {group.items.map((item, index) => (
              <CommandItem key={index}>{item}</CommandItem>
            ))}
          </CommandGroup>
        ))}
      </CommandList>
    </Command>
  );
};
