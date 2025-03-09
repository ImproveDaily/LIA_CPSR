export function PointsExplanation() {
  return (
    <div className="space-y-4 text-sm">
      <div>
        <h3 className="font-medium">How Points Work</h3>
        <p className="mt-1 text-muted-foreground">
          The Cumulative Points Soft Reserve (CPSR) system combines soft reserves with point accumulation.
        </p>
      </div>

      <div className="space-y-2">
        <h4 className="text-xs font-medium uppercase text-muted-foreground">Point Accumulation</h4>
        <ul className="ml-4 list-disc space-y-1 text-muted-foreground">
          <li>Each player can reserve specific items they want</li>
          <li>
            If the boss that drops your reserved item is killed, but you don't get the item (either because it didn't
            drop or someone else won it), you get <strong>+10 points</strong>
          </li>
          <li>Points accumulate for the same item reservation across multiple raids</li>
          <li>When you finally roll for your reserved item, your roll is increased by your accumulated points</li>
        </ul>
      </div>

      <div className="space-y-2">
        <h4 className="text-xs font-medium uppercase text-muted-foreground">Point Reset</h4>
        <ul className="ml-4 list-disc space-y-1 text-muted-foreground">
          <li>If you change your reservation to a different item, your points reset to 0</li>
          <li>If you win your reserved item, your points for that item are consumed</li>
        </ul>
      </div>

      <div className="space-y-2">
        <h4 className="text-xs font-medium uppercase text-muted-foreground">Example</h4>
        <div className="rounded-md bg-muted p-3">
          <div className="text-xs">
            <p>Player "Nameyorprice" reserves "Striker's Mark" from Magmadar.</p>
            <p className="mt-2">
              Raid 1: Magmadar is killed, but Striker's Mark doesn't drop. <strong>+10 points</strong>
            </p>
            <p>
              Raid 2: Magmadar is killed, Striker's Mark drops but another player wins it. <strong>+10 points</strong>
            </p>
            <p>
              Raid 3: Magmadar is killed, Striker's Mark drops. Player rolls a 65, plus 20 points ={" "}
              <strong>85 total</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

