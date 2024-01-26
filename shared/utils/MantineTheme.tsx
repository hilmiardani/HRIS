import ArrowDown from "@/icons/ArrowDown";
import Calendar from "@/icons/Calendar";
import { MantineThemeOverride } from "@mantine/core";

const MantineTheme: MantineThemeOverride = {
  fontFamily: '"DM Sans", sans-serif',
  colors: {
    primary: [
      "#FF0000",
      "#ff0000",
      "#ff0000",
      "#ff0000",
      "#ff0000",
      "#ff0000",
      "#ff0000",
      "#000000",
      "#000000",
      "#000000",
    ],
  },
  primaryColor: "primary",
  components: {
    Button: {
      classNames: {
        root: "text-base rounded-lg",
      },
    },
    Input: {
      classNames: {
        input:
          "min-h-[2.5rem] border-inactive rounded-lg placeholder:text-base focus-within:border-blue-500",
      },
    },
    PasswordInput: {
      classNames: {
        innerInput: "h-10 bg-white",
      },
    },
    Checkbox: {
      defaultProps: {
        size: "xs",
        color: "primary",
      },
    },
    Card: {
      classNames: {
        root: "shadow-lg rounded-md text-dark",
      },
    },
    // Badge: {
    //   defaultProps: {
    //     variant: "outline",
    //   },
    //   classNames: {
    //     root: "capitalize text-sm font-normal px-6 h-6",
    //   },
    // },
    MultiSelect: {
      // defaultProps: {
      //   rightSection: <ArrowDown />,
      //   rightSectionWidth: "3.5rem",
      //   nothingFound: "data tidak tersedia",
      //   searchable: true,
      //   hoverOnSearchChange: true,
      // },
      classNames: {
        rightSection: "pointer-events-none",
        // values: "h-10",
        value: "mt-1.5",
      },
    },

    Select: {
      defaultProps: {
        rightSection: <ArrowDown className="w-4 fill-black" />,
        rightSectionWidth: "3.5rem",
        nothingFoundMessage: "data tidak tersedia",
        // hoverOnSearchChange: true,
      },
      classNames: {
        rightSection: "pointer-events-none",
        input: "h-10",
      },
    },
    DatePicker: {
      defaultProps: {
        rightSection: <Calendar />,
        rightSectionWidth: "3.5rem",
        locale: "id",
        inputFormat: "DD MMMM YYYY",
      },
      classNames: {
        rightSection: "pointer-events-none",
        month: "w-full",
      },
    },
    Dropzone: {
      classNames: {
        root: "h-[91px] items-center flex justify-center",
      },
    },
    // ScrollArea: {
    //   styles: {
    //     scrollbar: {
    //       opacity: "30%",
    //       '&[data-orientation="vertical"] .mantine-ScrollArea-thumb': {
    //         maxWidth: "4px",
    //       },
    //       '&[data-orientation="horizontal"] .mantine-ScrollArea-thumb': {
    //         maxHeight: "4px",
    //       },
    //     },
    //   },
    // },
  },
};

export default MantineTheme;
