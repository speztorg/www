import React from "react";
import { storiesOf } from "@storybook/react";
import { boolean, text } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { Card } from "components";
import CardReadme from "./README.md";

storiesOf("Components", module)
  .addParameters({
    jest: ["Card.test"],
    readme: {
      sidebar: CardReadme,
      includePropTables: [Card]
    }
  })
  .add("Card", () => (
    <>
      <Card
        disabled={boolean("Disabled", false)}
        onClick={action("Card-clicked")}
        shortDescription="Tek að mér umbrot bóka og bæklinga"
        description="Hef innleitt SharePoint hjá ráðuneytum, Advania og Vífilfelli. Haldið fjölda byrjendanámskeiða fyrir fyrirtæki og einstaklinga, aðallega hjá SharePoint-skólanum i Faxafeni."
        years={10}
        months={12}
      />
      <Card
        disabled={boolean("Disabled", false)}
        onClick={action("Card-clicked")}
        shortDescription="Tek að mér umbrot bóka og bæklinga"
        description="Bara stundum."
        years={10}
        months={12}
      />
    </>
  ));
