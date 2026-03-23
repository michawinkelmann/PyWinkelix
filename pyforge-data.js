//  CHALLENGE DATA
// ═══════════════════════════════════════════════════════════
const LEVELS = [
// ── Level 1: Hello Python ──
{
  id:1, title:"Hello Python", desc:"print(), variables, and data types",
  challenges:[
    {
      id:"1.1", title:"Hello World", xp:10,
      instructions:`<p>Every programmer's journey begins with <code>Hello, World!</code></p>
<p>The <code>print()</code> function displays text on the screen. Text (called a <b>string</b>) must be wrapped in quotes.</p>
<pre><code>print("This is a message!")
print("You can print anything.")</code></pre>
<p><b>Your task:</b> Print exactly <code>Hello, World!</code> to the screen.</p>`,
      starter:'# Your first Python program!\n# Print "Hello, World!" below\n',
      hints:["Use the print() function","Put your text inside quotes: print(\"Hello, World!\")","Make sure the comma and exclamation mark are included"],
      check(output){ return output.trim()==="Hello, World!" ? {pass:true,msg:"Perfect! Your first Python output!"} : {pass:false,msg:'Expected exactly: Hello, World!'}; }
    },
    {
      id:"1.2", title:"Game Stats", xp:10,
      instructions:`<p>Variables store data. You create them with <code>=</code>. Python figures out the type automatically.</p>
<pre><code>name = "Shadow"      # string (text)
hp = 100              # int (whole number)
speed = 2.5           # float (decimal)
alive = True          # bool (True/False)</code></pre>
<p><b>Your task:</b> Create these variables and print each one:</p>
<p>&bull; <code>player_name</code> = <code>"Hero"</code><br>
&bull; <code>player_hp</code> = <code>100</code><br>
&bull; <code>player_level</code> = <code>1.5</code></p>
<p>Then print all three, each on its own line.</p>`,
      starter:'# Create your variables here\n\n\n# Print them\n',
      hints:["Create variables like: player_name = \"Hero\"","Use print(player_name) to display a variable","You need three print() calls, one for each variable"],
      check(output){
        const lines=output.trim().split('\n').map(s=>s.trim());
        if(lines.length<3) return {pass:false,msg:"Print all three variables, each on its own line."};
        if(!output.includes("Hero")) return {pass:false,msg:'player_name should be "Hero"'};
        if(!output.includes("100")) return {pass:false,msg:"player_hp should be 100"};
        if(!output.includes("1.5")) return {pass:false,msg:"player_level should be 1.5"};
        return {pass:true,msg:"Variables created and printed!"};
      }
    },
    {
      id:"1.3", title:"Math Power", xp:10,
      instructions:`<p>Python can do math with the standard operators:</p>
<pre><code>+   addition
-   subtraction
*   multiplication
/   division
**  exponentiation (power)
//  integer division
%   modulo (remainder)</code></pre>
<p><b>Your task:</b> Calculate total damage using this formula:</p>
<pre><code>base_attack = 25
multiplier = 3
bonus = 10
damage = base_attack * multiplier + bonus</code></pre>
<p>Print the result. It should be <code>85</code>.</p>`,
      starter:'base_attack = 25\nmultiplier = 3\nbonus = 10\n\n# Calculate damage and print it\n',
      hints:["Use: damage = base_attack * multiplier + bonus","Don't forget to print(damage)","Multiplication happens before addition (math rules apply)"],
      check(output){ return output.trim()==="85" ? {pass:true,msg:"Critical hit! Math works!"} : {pass:false,msg:"Expected output: 85"}; }
    },
    {
      id:"1.4", title:"Player Card", xp:15,
      instructions:`<p><b>f-strings</b> let you embed variables directly inside text. Put <code>f</code> before the string and use <code>{curly braces}</code>:</p>
<pre><code>name = "Aria"
level = 7
print(f"Player: {name}")
print(f"Level: {level}")
print(f"Next level in {100 - level * 10} XP")</code></pre>
<p><b>Your task:</b> Given the variables below, print a player card that looks exactly like this:</p>
<pre><code>=== PLAYER CARD ===
Name: Blade
Class: Warrior
HP: 120
Attack: 25</code></pre>`,
      starter:'name = "Blade"\nplayer_class = "Warrior"\nhp = 120\nattack = 25\n\n# Print the player card using f-strings\n',
      hints:['Use print("=== PLAYER CARD ===") for the header','Use f-strings: print(f"Name: {name}")','Print each line separately with print()'],
      check(output){
        const o=output.trim();
        if(!o.includes("=== PLAYER CARD ===")) return {pass:false,msg:'Missing header: === PLAYER CARD ==='};
        if(!o.includes("Name: Blade")) return {pass:false,msg:'Missing "Name: Blade"'};
        if(!o.includes("Class: Warrior")) return {pass:false,msg:'Missing "Class: Warrior"'};
        if(!o.includes("HP: 120")) return {pass:false,msg:'Missing "HP: 120"'};
        if(!o.includes("Attack: 25")) return {pass:false,msg:'Missing "Attack: 25"'};
        return {pass:true,msg:"Awesome player card!"};
      }
    }
  ]
},
// ── Level 2: Making Decisions ──
{
  id:2, title:"Making Decisions", desc:"if/elif/else and logic",
  challenges:[
    {
      id:"2.1", title:"Health Check", xp:10,
      instructions:`<p><code>if</code> statements let your program make decisions:</p>
<pre><code>if condition:
    # do this if True
else:
    # do this if False</code></pre>
<p>Comparison operators: <code>==</code> <code>!=</code> <code>&lt;</code> <code>&gt;</code> <code>&lt;=</code> <code>&gt;=</code></p>
<p><b>Your task:</b> Check the variable <code>hp</code>. If it's greater than 0, print <code>Alive</code>. Otherwise print <code>Game Over</code>.</p>
<p>Test with hp = 50 (should print "Alive").</p>`,
      starter:'hp = 50\n\n# Check if the player is alive\n',
      hints:["Use: if hp > 0:","Don't forget the colon : and indentation","The else block handles hp <= 0"],
      check(output){
        const o=output.trim();
        if(o==="Alive") return {pass:true,msg:"Player lives!"};
        if(o==="Game Over") return {pass:true,msg:"Game Over is also correct if hp <= 0!"};
        return {pass:false,msg:'Expected "Alive" or "Game Over"'};
      }
    },
    {
      id:"2.2", title:"Loot Rarity", xp:15,
      instructions:`<p>Use <code>elif</code> (else if) for multiple conditions:</p>
<pre><code>if score >= 90:
    print("S Rank")
elif score >= 70:
    print("A Rank")
elif score >= 50:
    print("B Rank")
else:
    print("C Rank")</code></pre>
<p><b>Your task:</b> Given a <code>score</code> variable, classify the loot:</p>
<p>&bull; score &gt;= 90 &rarr; print <code>Legendary</code><br>
&bull; score &gt;= 70 &rarr; print <code>Epic</code><br>
&bull; score &gt;= 40 &rarr; print <code>Rare</code><br>
&bull; otherwise &rarr; print <code>Common</code></p>
<p>Test with score = 75 (should print "Epic").</p>`,
      starter:'score = 75\n\n# Classify the loot rarity\n',
      hints:["Start with: if score >= 90:","Check conditions from highest to lowest","Don't forget the final else for Common"],
      check(output){
        const o=output.trim();
        if(["Legendary","Epic","Rare","Common"].includes(o)) return {pass:true,msg:`Loot classified: ${o}!`};
        return {pass:false,msg:'Expected one of: Legendary, Epic, Rare, Common'};
      }
    },
    {
      id:"2.3", title:"Can Buy?", xp:10,
      instructions:`<p>Logical operators combine conditions:</p>
<pre><code>and  - both must be True
or   - at least one must be True
not  - flips True/False</code></pre>
<p>Example: <code>if age >= 18 and has_ticket:</code></p>
<p><b>Your task:</b> A shop item costs 50 gold and requires level 5. Check if the player can buy it:</p>
<p>If <code>gold >= 50</code> AND <code>level >= 5</code>, print <code>Purchase complete!</code><br>
Otherwise print <code>Cannot buy this item.</code></p>`,
      starter:'gold = 80\nlevel = 3\n\n# Check if player can buy the item\n',
      hints:["Use: if gold >= 50 and level >= 5:","Both conditions must be True for the purchase","With gold=80 and level=3, the purchase should fail"],
      check(output){
        const o=output.trim();
        if(o==="Purchase complete!" || o==="Cannot buy this item.") return {pass:true,msg:"Shop logic works!"};
        return {pass:false,msg:'Expected "Purchase complete!" or "Cannot buy this item."'};
      }
    },
    {
      id:"2.4", title:"Rock Paper Scissors", xp:15,
      instructions:`<p>You can nest conditions and combine multiple checks to build game logic.</p>
<p><b>Your task:</b> Given <code>player</code> and <code>computer</code> variables (each is "rock", "paper", or "scissors"), determine the result:</p>
<p>&bull; If they match &rarr; print <code>Draw!</code><br>
&bull; If player wins &rarr; print <code>Player wins!</code><br>
&bull; Otherwise &rarr; print <code>Computer wins!</code></p>
<p>Remember: rock beats scissors, scissors beats paper, paper beats rock.</p>`,
      starter:'player = "rock"\ncomputer = "scissors"\n\n# Determine the winner\n',
      hints:["First check if player == computer for a draw","Player wins if: (rock vs scissors) or (scissors vs paper) or (paper vs rock)","You can use: if player == \"rock\" and computer == \"scissors\":"],
      check(output){
        const o=output.trim();
        if(["Draw!","Player wins!","Computer wins!"].includes(o)) return {pass:true,msg:"Game logic complete!"};
        return {pass:false,msg:'Expected "Draw!", "Player wins!", or "Computer wins!"'};
      }
    }
  ]
},
// ── Level 3: Loops ──
{
  id:3, title:"Loops", desc:"while, for, range, nested loops",
  challenges:[
    {
      id:"3.1", title:"Countdown", xp:10,
      instructions:`<p><code>while</code> loops repeat code as long as a condition is True:</p>
<pre><code>count = 5
while count > 0:
    print(count)
    count -= 1  # decrease by 1</code></pre>
<p><b>Your task:</b> Print a countdown from 10 to 1 using a while loop, then print <code>Liftoff!</code></p>
<pre><code>10
9
8
...
1
Liftoff!</code></pre>`,
      starter:'# Countdown from 10 to 1, then "Liftoff!"\n',
      hints:["Start with: count = 10","Use: while count > 0:","Don't forget count -= 1 inside the loop, and print Liftoff! after the loop"],
      check(output){
        const lines=output.trim().split('\n').map(s=>s.trim());
        if(lines.length<11) return {pass:false,msg:"Need 10 numbers plus Liftoff!"};
        if(lines[0]!=="10" || lines[9]!=="1") return {pass:false,msg:"Countdown should go from 10 to 1"};
        if(lines[10]!=="Liftoff!") return {pass:false,msg:'Last line should be "Liftoff!"'};
        return {pass:true,msg:"3... 2... 1... Liftoff!"};
      }
    },
    {
      id:"3.2", title:"Damage Rolls", xp:10,
      instructions:`<p><code>for</code> loops iterate over sequences. <code>range(n)</code> generates numbers 0 to n-1:</p>
<pre><code>for i in range(5):
    print(i)  # prints 0, 1, 2, 3, 4

for i in range(1, 6):
    print(i)  # prints 1, 2, 3, 4, 5</code></pre>
<p><b>Your task:</b> Use a for loop to print 5 lines in this format:</p>
<pre><code>Roll 1: 10 damage
Roll 2: 20 damage
Roll 3: 30 damage
Roll 4: 40 damage
Roll 5: 50 damage</code></pre>
<p>Each roll does <code>i * 10</code> damage (where i goes from 1 to 5).</p>`,
      starter:'# Print 5 damage rolls\n',
      hints:["Use: for i in range(1, 6):","Inside the loop: print(f\"Roll {i}: {i * 10} damage\")","range(1, 6) gives you 1, 2, 3, 4, 5"],
      check(output){
        const lines=output.trim().split('\n').map(s=>s.trim());
        if(lines.length!==5) return {pass:false,msg:"Expected exactly 5 lines"};
        for(let i=1;i<=5;i++){
          if(!lines[i-1].includes(`Roll ${i}`) || !lines[i-1].includes(`${i*10} damage`))
            return {pass:false,msg:`Line ${i} should be "Roll ${i}: ${i*10} damage"`};
        }
        return {pass:true,msg:"Damage rolls complete!"};
      }
    },
    {
      id:"3.3", title:"Enemy Search", xp:15,
      instructions:`<p>You can loop through a list and use <code>if</code> inside the loop to filter:</p>
<pre><code>items = ["sword", "shield", "potion"]
for item in items:
    if item == "potion":
        print(f"Found: {item}")</code></pre>
<p>The <code>startswith()</code> method checks if a string begins with specific text:</p>
<pre><code>"Dark Knight".startswith("Dark")  # True</code></pre>
<p><b>Your task:</b> Loop through the enemies list and print only names that start with "Dark".</p>`,
      starter:'enemies = ["Goblin", "Dark Knight", "Slime", "Dark Mage", "Wolf", "Dark Dragon"]\n\n# Print only enemies starting with "Dark"\n',
      hints:['Use: for enemy in enemies:','Check with: if enemy.startswith("Dark"):','Print the enemy name inside the if block'],
      check(output){
        const lines=output.trim().split('\n').map(s=>s.trim());
        const expected=["Dark Knight","Dark Mage","Dark Dragon"];
        if(lines.length!==3) return {pass:false,msg:"Expected exactly 3 dark enemies"};
        for(const e of expected) if(!output.includes(e)) return {pass:false,msg:`Missing: ${e}`};
        return {pass:true,msg:"All dark enemies found!"};
      }
    },
    {
      id:"3.4", title:"Times Table", xp:15,
      instructions:`<p>Nested loops are loops inside loops. The inner loop runs completely for each step of the outer loop:</p>
<pre><code>for row in range(1, 3):
    for col in range(1, 3):
        print(f"{row}x{col}={row*col}", end="  ")
    print()  # new line after each row</code></pre>
<p>The <code>end="  "</code> parameter keeps print on the same line.</p>
<p><b>Your task:</b> Print a multiplication table from 1 to 5. Each row should look like:</p>
<pre><code>1  2  3  4  5
2  4  6  8  10
3  6  9  12  15
4  8  12  16  20
5  10  15  20  25</code></pre>
<p>Hint: Print each product with <code>end="  "</code> and call <code>print()</code> at end of each row.</p>`,
      starter:'# Print a 5x5 multiplication table\n',
      hints:["Outer loop: for row in range(1, 6):","Inner loop: for col in range(1, 6):","Use print(row * col, end=\"  \") and print() after inner loop"],
      check(output){
        const lines=output.trim().split('\n');
        if(lines.length<5) return {pass:false,msg:"Expected 5 rows"};
        if(!lines[0].includes("1") || !lines[0].includes("5")) return {pass:false,msg:"First row should have products 1,2,3,4,5"};
        if(!lines[4].includes("25")) return {pass:false,msg:"Last row should contain 25"};
        return {pass:true,msg:"Multiplication table complete!"};
      }
    }
  ]
},
// ── Level 4: Functions ──
{
  id:4, title:"Functions", desc:"def, return, parameters, scope",
  challenges:[
    {
      id:"4.1", title:"Dice Roller", xp:10,
      instructions:`<p>Functions are reusable blocks of code defined with <code>def</code>:</p>
<pre><code>def greet(name):
    return f"Hello, {name}!"

result = greet("Player")
print(result)  # Hello, Player!</code></pre>
<p><code>return</code> sends a value back to whoever called the function.</p>
<p><b>Your task:</b> Write a function <code>roll_dice(sides)</code> that returns a random number from 1 to <code>sides</code>. Then call it 3 times with 6 sides and print each result.</p>
<p>Hint: <code>import random</code> and use <code>random.randint(1, sides)</code></p>`,
      starter:'import random\n\n# Define the roll_dice function\n\n\n# Roll 3 times and print results\n',
      hints:["Define: def roll_dice(sides):","Inside: return random.randint(1, sides)","Call: print(roll_dice(6)) three times"],
      check(output){
        const lines=output.trim().split('\n').map(s=>s.trim());
        if(lines.length<3) return {pass:false,msg:"Roll and print at least 3 times"};
        for(const l of lines){
          const n=parseInt(l);
          if(isNaN(n)||n<1||n>6) return {pass:false,msg:`Each result should be 1-6, got: ${l}`};
        }
        return {pass:true,msg:"Dice roller works!"};
      }
    },
    {
      id:"4.2", title:"Damage Calculator", xp:15,
      instructions:`<p>Functions can have <b>default parameters</b> — values used when no argument is given:</p>
<pre><code>def power(base, exponent=2):
    return base ** exponent

print(power(5))      # 25 (uses default 2)
print(power(5, 3))   # 125 (overrides to 3)</code></pre>
<p><b>Your task:</b> Write <code>calculate_damage(base, multiplier=1.0, bonus=0)</code> that returns <code>base * multiplier + bonus</code>.</p>
<p>Print these three calls:</p>
<pre><code>print(calculate_damage(20))
print(calculate_damage(20, 1.5))
print(calculate_damage(20, 2.0, 10))</code></pre>
<p>Expected output: <code>20.0</code>, <code>30.0</code>, <code>50.0</code></p>`,
      starter:'# Define calculate_damage with default parameters\n\n\n# Test it\nprint(calculate_damage(20))\nprint(calculate_damage(20, 1.5))\nprint(calculate_damage(20, 2.0, 10))\n',
      hints:["def calculate_damage(base, multiplier=1.0, bonus=0):","return base * multiplier + bonus","The function body is just one line"],
      check(output){
        const lines=output.trim().split('\n').map(s=>s.trim());
        if(lines.length<3) return {pass:false,msg:"Expected 3 lines of output"};
        const vals=lines.map(Number);
        if(vals[0]!==20) return {pass:false,msg:`First call should return 20.0, got ${lines[0]}`};
        if(vals[1]!==30) return {pass:false,msg:`Second call should return 30.0, got ${lines[1]}`};
        if(vals[2]!==50) return {pass:false,msg:`Third call should return 50.0, got ${lines[2]}`};
        return {pass:true,msg:"Damage calculator works!"};
      }
    },
    {
      id:"4.3", title:"Health Bar", xp:15,
      instructions:`<p>Functions can do complex formatting. String multiplication creates repeated characters:</p>
<pre><code>"#" * 5   # "#####"
"-" * 3   # "---"</code></pre>
<p><b>Your task:</b> Write <code>display_health(name, current, maximum)</code> that prints a health bar like this:</p>
<pre><code>Hero: [##########----------] 50/100 HP</code></pre>
<p>The bar has 20 characters total. <code>#</code> for filled, <code>-</code> for empty. The fill is proportional (50/100 = 10 filled).</p>
<p>Call it with: <code>display_health("Hero", 50, 100)</code> and <code>display_health("Boss", 75, 150)</code></p>`,
      starter:'# Define the health bar function\n\n\n# Test it\ndisplay_health("Hero", 50, 100)\ndisplay_health("Boss", 75, 150)\n',
      hints:["Calculate filled: int(20 * current / maximum)","Build bar: \"#\" * filled + \"-\" * (20 - filled)",'Print with f-string: f"{name}: [{bar}] {current}/{maximum} HP"'],
      check(output){
        if(!output.includes("Hero:") || !output.includes("[")) return {pass:false,msg:"Output should include health bars with names"};
        if(!output.includes("50/100")) return {pass:false,msg:'Should show "50/100 HP" for Hero'};
        if(!output.includes("#") && !output.includes("-")) return {pass:false,msg:"Bar should use # and - characters"};
        return {pass:true,msg:"Health bars look great!"};
      }
    },
    {
      id:"4.4", title:"Battle Round", xp:20,
      instructions:`<p>Functions can call other functions, creating modular code:</p>
<pre><code>def add(a, b):
    return a + b

def multiply(a, b):
    return a * b

def power_calc(base, bonus, multiplier):
    total = add(base, bonus)
    return multiply(total, multiplier)</code></pre>
<p><b>Your task:</b> Write two functions:</p>
<p>1. <code>calculate_damage(attack, defense)</code> returns <code>max(0, attack - defense)</code></p>
<p>2. <code>battle_round(atk_name, atk_power, def_name, def_armor, def_hp)</code> calculates damage using the first function, subtracts from HP, and prints:</p>
<pre><code>Hero attacks Goblin for 12 damage!
Goblin HP: 18/30</code></pre>
<p>It should also return the remaining HP.</p>
<p>Call: <code>battle_round("Hero", 20, "Goblin", 8, 30)</code></p>`,
      starter:'# Define calculate_damage\n\n\n# Define battle_round\n\n\n# Test\nremaining = battle_round("Hero", 20, "Goblin", 8, 30)\nprint(f"Remaining: {remaining}")\n',
      hints:["calculate_damage: return max(0, attack - defense)","In battle_round: dmg = calculate_damage(atk_power, def_armor)","remaining_hp = def_hp - dmg, then print and return remaining_hp"],
      check(output){
        if(!output.includes("attacks") || !output.includes("damage")) return {pass:false,msg:'Should print "[name] attacks [name] for [n] damage!"'};
        if(!output.includes("12")) return {pass:false,msg:"Damage should be 20-8=12"};
        if(!output.includes("18")) return {pass:false,msg:"Remaining HP should be 30-12=18"};
        return {pass:true,msg:"Battle system works!"};
      }
    }
  ]
},
// ── Level 5: Lists ──
{
  id:5, title:"Lists", desc:"Creating, modifying, and iterating lists",
  challenges:[
    {
      id:"5.1", title:"Inventory", xp:10,
      instructions:`<p>Lists store ordered collections of items:</p>
<pre><code>items = ["sword", "shield", "potion"]
items.append("bow")     # add item
items.remove("shield")  # remove item
print(len(items))       # count items: 3</code></pre>
<p><b>Your task:</b></p>
<p>1. Create a list <code>inventory</code> with: "sword", "shield", "potion"<br>
2. Append "bow"<br>
3. Remove "shield"<br>
4. Print the final list<br>
5. Print the number of items</p>`,
      starter:'# Create and modify the inventory\n',
      hints:['inventory = ["sword", "shield", "potion"]','Use .append("bow") and .remove("shield")','Print the list and len(inventory)'],
      check(output){
        if(!output.includes("sword") || !output.includes("bow")) return {pass:false,msg:"List should contain sword and bow"};
        if(output.includes("shield")) return {pass:false,msg:"Shield should have been removed"};
        if(!output.includes("3")) return {pass:false,msg:"Should print length 3"};
        return {pass:true,msg:"Inventory management!"};
      }
    },
    {
      id:"5.2", title:"Sorting Loot", xp:15,
      instructions:`<p>Useful list operations:</p>
<pre><code>nums = [42, 7, 15, 3, 99]
nums.sort()          # sorts in place
print(min(nums))     # smallest: 3
print(max(nums))     # largest: 99
print(sorted(nums, reverse=True))  # descending</code></pre>
<p><b>Your task:</b> Given damage values, print:</p>
<p>1. Minimum damage<br>2. Maximum damage<br>3. The sorted list (ascending)</p>`,
      starter:'damage_rolls = [45, 12, 78, 33, 91, 27, 56]\n\n# Print min, max, and sorted list\n',
      hints:["print(min(damage_rolls))","print(max(damage_rolls))","print(sorted(damage_rolls))"],
      check(output){
        if(!output.includes("12")) return {pass:false,msg:"Minimum should be 12"};
        if(!output.includes("91")) return {pass:false,msg:"Maximum should be 91"};
        if(!output.includes("[12")) return {pass:false,msg:"Sorted list should start with 12"};
        return {pass:true,msg:"Loot sorted!"};
      }
    },
    {
      id:"5.3", title:"Party Roster", xp:15,
      instructions:`<p>Lists can contain dictionaries, creating structured data:</p>
<pre><code>players = [
    {"name": "Aria", "class": "Mage"},
    {"name": "Rex", "class": "Warrior"}
]
for p in players:
    print(f"{p['name']} - {p['class']}")</code></pre>
<p><b>Your task:</b> Create a party list with 3 members (each a dict with "name", "class", "level"). Loop through and print each as:</p>
<pre><code>1. Aria the Mage (Level 5)
2. Rex the Warrior (Level 3)
3. Luna the Rogue (Level 7)</code></pre>`,
      starter:'# Create the party list\nparty = [\n    {"name": "Aria", "class": "Mage", "level": 5},\n    # Add 2 more members\n]\n\n# Print the roster\n',
      hints:["Add more dicts to the party list","Use enumerate: for i, member in enumerate(party, 1):","Print with f-string using member['name'], member['class'], member['level']"],
      check(output){
        const lines=output.trim().split('\n');
        if(lines.length<3) return {pass:false,msg:"Need at least 3 party members"};
        if(!output.includes("1.") || !output.includes("Level")) return {pass:false,msg:'Format: "1. Name the Class (Level N)"'};
        return {pass:true,msg:"Party assembled!"};
      }
    },
    {
      id:"5.4", title:"List Slicing", xp:15,
      instructions:`<p>Slicing extracts parts of a list with <code>[start:end:step]</code>:</p>
<pre><code>a = [10, 20, 30, 40, 50, 60]
print(a[0:3])    # [10, 20, 30] - first 3
print(a[-2:])    # [50, 60]     - last 2
print(a[::2])    # [10, 30, 50] - every other</code></pre>
<p><b>Your task:</b> Given the skills list, print:</p>
<p>1. First 3 skills<br>2. Last 2 skills<br>3. Every other skill</p>`,
      starter:'skills = ["Fire", "Ice", "Thunder", "Heal", "Shield", "Dash"]\n\n# Print first 3\n\n# Print last 2\n\n# Print every other skill\n',
      hints:["First 3: print(skills[:3]) or print(skills[0:3])","Last 2: print(skills[-2:])","Every other: print(skills[::2])"],
      check(output){
        if(!output.includes("Fire") || !output.includes("Thunder")) return {pass:false,msg:"First 3 should include Fire, Ice, Thunder"};
        if(!output.includes("Shield") || !output.includes("Dash")) return {pass:false,msg:"Last 2 should include Shield, Dash"};
        return {pass:true,msg:"Slicing mastered!"};
      }
    }
  ]
},
// ── Level 6: Dictionaries ──
{
  id:6, title:"Dictionaries", desc:"Key-value pairs and nested data",
  challenges:[
    {
      id:"6.1", title:"Character Sheet", xp:10,
      instructions:`<p>Dictionaries store key-value pairs:</p>
<pre><code>player = {
    "name": "Hero",
    "hp": 100,
    "attack": 20
}
print(player["name"])   # Hero
player["hp"] -= 10      # modify value
print(player["hp"])     # 90</code></pre>
<p><b>Your task:</b> Create a character dictionary with keys: name, char_class, hp, attack, defense. Print each value on its own line with a label:</p>
<pre><code>Name: Shadow
Class: Rogue
HP: 80
Attack: 22
Defense: 8</code></pre>`,
      starter:'# Create the character dictionary\n\n\n# Print each stat\n',
      hints:['player = {"name": "Shadow", "char_class": "Rogue", ...}','Access with player["name"]','Use f-strings: print(f"Name: {player[\'name\']}")'],
      check(output){
        const o=output.trim();
        if(!o.includes("Name:") || !o.includes("Class:")) return {pass:false,msg:"Include Name: and Class: labels"};
        if(!o.includes("HP:") || !o.includes("Attack:") || !o.includes("Defense:")) return {pass:false,msg:"Include HP:, Attack:, Defense: labels"};
        const lines=o.split('\n');
        if(lines.length<5) return {pass:false,msg:"Print 5 lines (one per stat)"};
        return {pass:true,msg:"Character sheet complete!"};
      }
    },
    {
      id:"6.2", title:"Item Shop", xp:15,
      instructions:`<p>Dictionaries are perfect for counting and tracking quantities:</p>
<pre><code>stock = {"potion": 5, "arrow": 20}
stock["potion"] -= 1          # sell one
stock["bomb"] = 3             # add new item
del stock["arrow"]            # remove item
print(stock)
for item, count in stock.items():
    print(f"{item}: {count}")</code></pre>
<p><b>Your task:</b> Manage an inventory dict:</p>
<p>1. Start with: potion: 3, arrow: 10, bomb: 1<br>
2. Add 2 more potions<br>
3. Use 5 arrows<br>
4. Add a new item "shield": 1<br>
5. Print all items and their counts</p>`,
      starter:'# Start inventory\ninventory = {"potion": 3, "arrow": 10, "bomb": 1}\n\n# Modify inventory\n\n\n# Print all items\n',
      hints:['inventory["potion"] += 2','inventory["arrow"] -= 5','Use a for loop: for item, count in inventory.items():'],
      check(output){
        if(!output.includes("potion") || !output.includes("5")) return {pass:false,msg:"Potions should be 5 (3+2)"};
        if(!output.includes("arrow") && !output.includes("5")) return {pass:false,msg:"Arrows should be 5 (10-5)"};
        if(!output.includes("shield") || !output.includes("1")) return {pass:false,msg:"Shield should be added with count 1"};
        return {pass:true,msg:"Shop inventory managed!"};
      }
    },
    {
      id:"6.3", title:"Nested Stats", xp:15,
      instructions:`<p>Dictionaries can contain other dictionaries:</p>
<pre><code>game = {
    "player": {
        "name": "Hero",
        "stats": {"hp": 100, "mp": 50}
    },
    "level": 1
}
print(game["player"]["stats"]["hp"])  # 100</code></pre>
<p><b>Your task:</b> Create a nested game state dict with a player who has stats and equipment sub-dicts. Print:</p>
<pre><code>Player: Hero
HP: 100
Weapon: Iron Sword
Weapon Damage: 15</code></pre>`,
      starter:'# Create nested game state\ngame = {\n    "player": {\n        "name": "Hero",\n        "stats": {"hp": 100, "mp": 50, "attack": 20},\n        "equipment": {\n            "weapon": {"name": "Iron Sword", "damage": 15},\n            "armor": {"name": "Leather", "defense": 5}\n        }\n    }\n}\n\n# Print Player name, HP, Weapon name, Weapon damage\n',
      hints:['Access name: game["player"]["name"]','Access HP: game["player"]["stats"]["hp"]','Weapon: game["player"]["equipment"]["weapon"]["name"]'],
      check(output){
        if(!output.includes("Hero")) return {pass:false,msg:"Should print player name"};
        if(!output.includes("100")) return {pass:false,msg:"Should print HP: 100"};
        if(!output.includes("Iron Sword")) return {pass:false,msg:"Should print weapon name"};
        if(!output.includes("15")) return {pass:false,msg:"Should print weapon damage"};
        return {pass:true,msg:"Nested data mastered!"};
      }
    },
    {
      id:"6.4", title:"Bestiary", xp:15,
      instructions:`<p>Looping through dictionaries of dictionaries is a common pattern in games:</p>
<pre><code>for key, value in my_dict.items():
    print(f"{key}: {value}")</code></pre>
<p><b>Your task:</b> Loop through the bestiary and print each creature formatted as:</p>
<pre><code>--- Goblin ---
Type: ground
HP: 30
Danger: low</code></pre>`,
      starter:'bestiary = {\n    "Goblin": {"type": "ground", "hp": 30, "danger": "low"},\n    "Dragon": {"type": "flying", "hp": 200, "danger": "extreme"},\n    "Slime": {"type": "ground", "hp": 15, "danger": "harmless"}\n}\n\n# Print each creature\n',
      hints:["for name, info in bestiary.items():","Print --- name --- as separator",'Access info["type"], info["hp"], info["danger"]'],
      check(output){
        if(!output.includes("Goblin") || !output.includes("Dragon") || !output.includes("Slime")) return {pass:false,msg:"Print all 3 creatures"};
        if(!output.includes("---")) return {pass:false,msg:"Use --- separators"};
        if(!output.includes("ground") || !output.includes("flying")) return {pass:false,msg:"Include creature types"};
        return {pass:true,msg:"Bestiary complete!"};
      }
    }
  ]
},
// ── Level 7: String Mastery ──
{
  id:7, title:"String Mastery", desc:"String methods and text processing",
  challenges:[
    {
      id:"7.1", title:"Chat Commands", xp:15,
      instructions:`<p>Strings have powerful methods for parsing text:</p>
<pre><code>"hello world".split()        # ["hello", "world"]
"hello".startswith("he")     # True
"HELLO".lower()              # "hello"
"  spaces  ".strip()         # "spaces"</code></pre>
<p><b>Your task:</b> Parse game chat commands. Given a <code>message</code> string:</p>
<p>1. If it starts with "/", it's a command. Split it and print the command name and arguments separately.<br>
2. If not, just print "Chat: " followed by the message.</p>
<p>Test with <code>"/attack dragon"</code> &rarr; should print:</p>
<pre><code>Command: attack
Args: dragon</code></pre>`,
      starter:'message = "/attack dragon"\n\n# Parse the message\n',
      hints:['Check: if message.startswith("/"):','Split: parts = message.split()','Command: parts[0][1:] removes the "/" prefix. Args: " ".join(parts[1:])'],
      check(output){
        const o=output.trim().toLowerCase();
        if(!o.includes("command") || !o.includes("attack")) return {pass:false,msg:'Should identify "attack" as the command'};
        if(!o.includes("dragon")) return {pass:false,msg:'Should show "dragon" as argument'};
        return {pass:true,msg:"Command parser works!"};
      }
    },
    {
      id:"7.2", title:"Caesar Cipher", xp:20,
      instructions:`<p>The Caesar cipher shifts each letter by a fixed amount:</p>
<pre><code>ord("A")   # 65 (character to number)
chr(65)    # "A" (number to character)
chr(ord("A") + 1)  # "B"</code></pre>
<p><b>Your task:</b> Write a function <code>encrypt(text, shift)</code> that shifts each letter. Non-letters stay unchanged. Test with:</p>
<pre><code>print(encrypt("HELLO", 3))  # should print "KHOOR"
print(encrypt("abc", 1))    # should print "bcd"</code></pre>`,
      starter:'def encrypt(text, shift):\n    result = ""\n    for char in text:\n        # Your code here: shift letters, keep others\n        pass\n    return result\n\nprint(encrypt("HELLO", 3))\nprint(encrypt("abc", 1))\n',
      hints:["Check if char is a letter with char.isalpha()","For uppercase: chr((ord(char) - 65 + shift) % 26 + 65)","For lowercase: chr((ord(char) - 97 + shift) % 26 + 97)"],
      check(output){
        const lines=output.trim().split('\n').map(s=>s.trim());
        if(!lines[0] || lines[0]!=="KHOOR") return {pass:false,msg:'encrypt("HELLO", 3) should give "KHOOR"'};
        if(!lines[1] || lines[1]!=="bcd") return {pass:false,msg:'encrypt("abc", 1) should give "bcd"'};
        return {pass:true,msg:"Cipher cracked!"};
      }
    },
    {
      id:"7.3", title:"Word Counter", xp:15,
      instructions:`<p>Combining strings and dictionaries for text analysis:</p>
<pre><code>text = "the cat sat on the mat"
words = text.lower().split()
counts = {}
for word in words:
    if word in counts:
        counts[word] += 1
    else:
        counts[word] = 1</code></pre>
<p><b>Your task:</b> Count word occurrences in the given text. Print each word and its count, sorted by count (highest first).</p>`,
      starter:'text = "the dragon fought the knight and the knight won the battle"\n\n# Count words and print results\n',
      hints:["Split text into words: words = text.lower().split()","Build a counts dictionary","Sort: sorted(counts.items(), key=lambda x: x[1], reverse=True)"],
      check(output){
        if(!output.includes("the") && !output.includes("4")) return {pass:false,msg:'"the" appears 4 times'};
        if(!output.includes("knight")) return {pass:false,msg:"Should include 'knight'"};
        return {pass:true,msg:"Word analysis complete!"};
      }
    }
  ]
},
// ── Level 8: OOP Basics ──
{
  id:8, title:"OOP Basics", desc:"Classes, objects, and methods",
  challenges:[
    {
      id:"8.1", title:"First Class", xp:15,
      instructions:`<p>Classes are blueprints for creating objects:</p>
<pre><code>class Dog:
    def __init__(self, name, breed):
        self.name = name
        self.breed = breed

    def bark(self):
        print(f"{self.name} says: Woof!")

rex = Dog("Rex", "Husky")
rex.bark()  # Rex says: Woof!</code></pre>
<p><b>Your task:</b> Create a <code>Player</code> class with:</p>
<p>&bull; <code>__init__(self, name, hp)</code> that sets name and hp<br>
&bull; <code>greet(self)</code> that prints a greeting</p>
<p>Create a player and call greet(). Expected output:</p>
<pre><code>I am Hero with 100 HP!</code></pre>`,
      starter:'# Define the Player class\n\n\n# Create a player and greet\nplayer = Player("Hero", 100)\nplayer.greet()\n',
      hints:["class Player:","def __init__(self, name, hp): self.name = name; self.hp = hp",'def greet(self): print(f"I am {self.name} with {self.hp} HP!")'],
      check(output){
        if(!output.includes("Hero") || !output.includes("100")) return {pass:false,msg:'Should print something with "Hero" and "100"'};
        return {pass:true,msg:"First class created!"};
      }
    },
    {
      id:"8.2", title:"Battle Character", xp:20,
      instructions:`<p>Methods can modify the object's state and interact with other objects:</p>
<pre><code>class Counter:
    def __init__(self):
        self.value = 0
    def increment(self):
        self.value += 1</code></pre>
<p><b>Your task:</b> Add to the Player class:</p>
<p>&bull; <code>take_damage(self, amount)</code> reduces HP (minimum 0), prints damage taken<br>
&bull; <code>attack(self, other)</code> deals 10 damage to another Player, prints the attack</p>
<p>Create two players and have them fight one round. Print both players' HP after.</p>`,
      starter:'class Player:\n    def __init__(self, name, hp):\n        self.name = name\n        self.hp = hp\n\n    # Add take_damage and attack methods\n\n\nhero = Player("Hero", 50)\nenemy = Player("Goblin", 30)\nhero.attack(enemy)\nenemy.attack(hero)\nprint(f"{hero.name}: {hero.hp} HP")\nprint(f"{enemy.name}: {enemy.hp} HP")\n',
      hints:["take_damage: self.hp = max(0, self.hp - amount)","attack: print(f\"{self.name} attacks {other.name}!\"); other.take_damage(10)","Methods modify self or other objects via their attributes"],
      check(output){
        if(!output.includes("attack")) return {pass:false,msg:"Should print attack messages"};
        if(!output.includes("40") || !output.includes("20")) return {pass:false,msg:"After one round: Hero should have 40 HP, Goblin 20 HP"};
        return {pass:true,msg:"Battle system works!"};
      }
    },
    {
      id:"8.3", title:"Magic __str__", xp:15,
      instructions:`<p>The <code>__str__</code> method defines how <code>print()</code> displays your object:</p>
<pre><code>class Item:
    def __init__(self, name, value):
        self.name = name
        self.value = value
    def __str__(self):
        return f"{self.name} (worth {self.value} gold)"

sword = Item("Iron Sword", 50)
print(sword)  # Iron Sword (worth 50 gold)</code></pre>
<p><b>Your task:</b> Add <code>__str__</code> to the Player class so <code>print(player)</code> shows:</p>
<pre><code>[Warrior] Hero - HP: 100/100</code></pre>`,
      starter:'class Player:\n    def __init__(self, name, char_class, hp):\n        self.name = name\n        self.char_class = char_class\n        self.max_hp = hp\n        self.hp = hp\n\n    # Add __str__ method\n\n\nplayer = Player("Hero", "Warrior", 100)\nprint(player)\n',
      hints:["def __str__(self):","return f\"[{self.char_class}] {self.name} - HP: {self.hp}/{self.max_hp}\"","__str__ must return a string, not print it"],
      check(output){
        const o=output.trim();
        if(!o.includes("[Warrior]") || !o.includes("Hero")) return {pass:false,msg:'Should show "[Warrior] Hero"'};
        if(!o.includes("100/100")) return {pass:false,msg:'Should show "HP: 100/100"'};
        return {pass:true,msg:"__str__ magic!"};
      }
    },
    {
      id:"8.4", title:"Item Classes", xp:20,
      instructions:`<p>You can create related classes for different game objects:</p>
<pre><code>class Item:
    def __init__(self, name, value):
        self.name = name
        self.value = value

class Weapon(Item):
    def __init__(self, name, value, damage):
        super().__init__(name, value)
        self.damage = damage</code></pre>
<p><b>Your task:</b> Create an <code>Item</code> base class and two subclasses: <code>Weapon</code> (with damage) and <code>Potion</code> (with heal_amount). Add <code>__str__</code> to each. Create one of each and print them.</p>`,
      starter:'# Define Item, Weapon, and Potion classes\n\n\n# Create and print one of each\n',
      hints:["class Item with __init__(self, name, value) and __str__","class Weapon(Item) adds damage attribute using super().__init__()","class Potion(Item) adds heal_amount"],
      check(output){
        const o=output.trim().toLowerCase();
        if(!o.includes("damage") && !o.includes("weapon") && !o.includes("sword")) return {pass:false,msg:"Should print a weapon with its damage stat"};
        if(!o.includes("heal") && !o.includes("potion") && !o.includes("restore")) return {pass:false,msg:"Should print a potion with its heal amount"};
        return {pass:true,msg:"Item system complete!"};
      }
    }
  ]
},
// ── Level 9: Inheritance ──
{
  id:9, title:"Inheritance", desc:"Subclasses, overriding, and super()",
  challenges:[
    {
      id:"9.1", title:"Character Classes", xp:20,
      instructions:`<p>Inheritance creates specialized versions of a class:</p>
<pre><code>class Animal:
    def __init__(self, name):
        self.name = name
    def speak(self):
        return "..."

class Dog(Animal):
    def speak(self):
        return "Woof!"</code></pre>
<p><b>Your task:</b> Create a base <code>Character</code> class with name, hp, attack. Then create <code>Warrior</code> (high HP, medium attack) and <code>Mage</code> (low HP, high attack) subclasses. Each should have a <code>special_ability()</code> method that prints a unique message. Create one of each and demonstrate their abilities.</p>`,
      starter:'class Character:\n    def __init__(self, name, hp, attack):\n        self.name = name\n        self.hp = hp\n        self.attack = attack\n\n    def info(self):\n        print(f"{self.name} - HP: {self.hp}, ATK: {self.attack}")\n\n# Create Warrior and Mage subclasses\n\n\n# Create instances and show abilities\n',
      hints:["class Warrior(Character): and use super().__init__(name, 120, 15)","Add special_ability method to each subclass","Create: w = Warrior(\"Rex\"); m = Mage(\"Aria\")"],
      check(output){
        if(output.trim().split('\n').length < 2) return {pass:false,msg:"Show info/abilities for at least 2 characters"};
        return {pass:true,msg:"Character classes created!"};
      }
    },
    {
      id:"9.2", title:"Method Override", xp:20,
      instructions:`<p>Subclasses can <b>override</b> parent methods to change behavior:</p>
<pre><code>class Shape:
    def area(self):
        return 0

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius
    def area(self):  # overrides Shape.area
        return 3.14159 * self.radius ** 2</code></pre>
<p><b>Your task:</b> Override the <code>attack_target(target)</code> method:</p>
<p>&bull; <b>Warrior</b>: deals <code>self.attack + 5</code> damage (bonus strength)<br>
&bull; <b>Mage</b>: deals <code>self.attack * 2</code> damage (spell power)</p>
<p>Both should print what happened and call <code>target.take_damage()</code>.</p>`,
      starter:'class Character:\n    def __init__(self, name, hp, attack):\n        self.name = name\n        self.hp = hp\n        self.attack = attack\n\n    def take_damage(self, amount):\n        self.hp = max(0, self.hp - amount)\n        print(f"{self.name} takes {amount} damage! HP: {self.hp}")\n\n    def attack_target(self, target):\n        target.take_damage(self.attack)\n\n# Override attack_target in Warrior and Mage\nclass Warrior(Character):\n    def __init__(self, name):\n        super().__init__(name, 120, 15)\n\nclass Mage(Character):\n    def __init__(self, name):\n        super().__init__(name, 70, 25)\n\nw = Warrior("Rex")\nm = Mage("Aria")\nw.attack_target(m)\nm.attack_target(w)\nprint(f"\\n{w.name}: {w.hp} HP | {m.name}: {m.hp} HP")\n',
      hints:["In Warrior: def attack_target(self, target): target.take_damage(self.attack + 5)","In Mage: target.take_damage(self.attack * 2)","Don't forget to add a print statement before dealing damage"],
      check(output){
        if(!output.includes("damage") || !output.includes("HP:")) return {pass:false,msg:"Should show damage dealt and remaining HP"};
        if(!output.includes("Rex") || !output.includes("Aria")) return {pass:false,msg:"Both characters should be involved"};
        return {pass:true,msg:"Method overriding mastered!"};
      }
    },
    {
      id:"9.3", title:"Super Powers", xp:20,
      instructions:`<p><code>super()</code> calls the parent class version of a method:</p>
<pre><code>class Animal:
    def __init__(self, name, legs):
        self.name = name
        self.legs = legs

class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name, 4)  # dogs have 4 legs
        self.breed = breed  # extra attribute</code></pre>
<p><b>Your task:</b> Create a <code>BossEnemy</code> class that inherits from Character but adds <code>phase</code> and <code>rage</code> attributes. Override <code>take_damage</code> so the boss gets +5 rage each time hit, and when rage >= 20, print <code>"BOSS ENRAGED!"</code> and reset rage to 0. Create a boss and hit it 5 times.</p>`,
      starter:'class Character:\n    def __init__(self, name, hp, attack):\n        self.name = name\n        self.hp = hp\n        self.attack = attack\n\n    def take_damage(self, amount):\n        self.hp = max(0, self.hp - amount)\n        print(f"{self.name} takes {amount} damage! HP: {self.hp}")\n\n# Create BossEnemy subclass\n\n\n# Create boss and hit it 5 times\nboss = BossEnemy("Dark Lord", 200, 30)\nfor i in range(5):\n    boss.take_damage(10)\n',
      hints:["class BossEnemy(Character): with super().__init__() in __init__","Add self.phase = 1 and self.rage = 0 after super() call","Override take_damage: call super().take_damage(amount), then self.rage += 5, check if >= 20"],
      check(output){
        if(!output.includes("damage") || !output.includes("HP:")) return {pass:false,msg:"Should show damage messages"};
        if(!output.includes("ENRAGED") && !output.includes("enraged")) return {pass:false,msg:"Boss should get enraged when rage hits 20"};
        return {pass:true,msg:"Boss mechanic works!"};
      }
    }
  ]
},
// ── Level 10: 2D Lists ──
{
  id:10, title:"2D Lists", desc:"Grids, coordinates, and maps",
  challenges:[
    {
      id:"10.1", title:"Grid World", xp:15,
      instructions:`<p>A 2D list is a list of lists, perfect for game grids:</p>
<pre><code>grid = [
    [".", ".", "."],
    [".", "P", "."],
    [".", ".", "."]
]
# Access: grid[row][col]
print(grid[1][1])  # "P"</code></pre>
<p><b>Your task:</b> Create a 5x5 grid filled with <code>"."</code>. Place a player <code>"P"</code> at row 2, col 2. Print the grid with spaces between cells.</p>
<pre><code>. . . . .
. . . . .
. . P . .
. . . . .
. . . . .</code></pre>`,
      starter:'# Create a 5x5 grid and place the player\n\n\n# Print the grid\n',
      hints:['grid = [["." for _ in range(5)] for _ in range(5)]','grid[2][2] = "P"','for row in grid: print(" ".join(row))'],
      check(output){
        if(!output.includes("P")) return {pass:false,msg:"Player P should be on the grid"};
        const lines=output.trim().split('\n');
        if(lines.length<5) return {pass:false,msg:"Grid should have 5 rows"};
        if(lines[2].trim().indexOf("P") < 0) return {pass:false,msg:"P should be in row 2 (third row)"};
        return {pass:true,msg:"Grid world created!"};
      }
    },
    {
      id:"10.2", title:"Treasure Map", xp:20,
      instructions:`<p>You can check adjacent cells in a grid by looking at neighboring positions:</p>
<pre><code>neighbors = [(-1,-1),(-1,0),(-1,1),
             (0,-1),        (0,1),
             (1,-1), (1,0), (1,1)]

for dr, dc in neighbors:
    nr, nc = row + dr, col + dc
    if 0 <= nr < rows and 0 <= nc < cols:
        # valid neighbor</code></pre>
<p><b>Your task:</b> Write a function <code>count_adjacent_treasures(grid, row, col)</code> that counts how many <code>"T"</code> cells surround a given position (like Minesweeper). Test it on the provided grid.</p>`,
      starter:'grid = [\n    [".", "T", ".", ".", "."],\n    [".", ".", ".", "T", "."],\n    ["T", ".", ".", ".", "."],\n    [".", ".", "T", ".", "T"],\n    [".", ".", ".", ".", "."]\n]\n\ndef count_adjacent_treasures(grid, row, col):\n    # Count T neighbors\n    pass\n\n# Test: count at position (1,1) and (2,1)\nprint(count_adjacent_treasures(grid, 1, 1))  # should be 2\nprint(count_adjacent_treasures(grid, 2, 1))  # should be 2\n',
      hints:["Define the 8 neighbor offsets as a list of (dr, dc) tuples","Loop through offsets, check bounds, check if cell == 'T'","count += 1 for each treasure found"],
      check(output){
        const lines=output.trim().split('\n').map(s=>s.trim());
        if(lines[0]==="2" && lines[1]==="2") return {pass:true,msg:"Treasure counter works!"};
        if(lines.includes("2")) return {pass:true,msg:"Treasure counting looks correct!"};
        return {pass:false,msg:"Position (1,1) should have 2 adjacent treasures"};
      }
    },
    {
      id:"10.3", title:"Mini Map", xp:20,
      instructions:`<p>Combine grids with movement to create explorable maps:</p>
<p><b>Your task:</b> Create a movement system. Write a function <code>move(grid, pos, direction)</code> where direction is "up"/"down"/"left"/"right". The function should:</p>
<p>1. Calculate new position<br>
2. Check if in bounds and not a wall "#"<br>
3. Move player if valid, else print "Blocked!"<br>
4. Return new position</p>
<p>Place player at (1,1), move right twice, then down once. Print the grid after each move.</p>`,
      starter:'grid = [\n    ["#", "#", "#", "#", "#"],\n    ["#", ".", ".", ".", "#"],\n    ["#", ".", "#", ".", "#"],\n    ["#", ".", ".", ".", "#"],\n    ["#", "#", "#", "#", "#"]\n]\n\ndef print_grid(grid, pos):\n    for r in range(len(grid)):\n        row = ""\n        for c in range(len(grid[r])):\n            if (r, c) == pos:\n                row += "P "\n            else:\n                row += grid[r][c] + " "\n        print(row.strip())\n    print()\n\ndef move(grid, pos, direction):\n    # Calculate new position, check validity, return new pos\n    pass\n\n# Start at (1,1), move right, right, down\npos = (1, 1)\nprint_grid(grid, pos)\npos = move(grid, pos, "right")\nprint_grid(grid, pos)\npos = move(grid, pos, "right")\nprint_grid(grid, pos)\npos = move(grid, pos, "down")\nprint_grid(grid, pos)\n',
      hints:['directions = {"up":(-1,0), "down":(1,0), "left":(0,-1), "right":(0,1)}','new_r, new_c = pos[0] + dr, pos[1] + dc','Check: if grid[new_r][new_c] != "#": return (new_r, new_c)'],
      check(output){
        if(!output.includes("P")) return {pass:false,msg:"Grid should show player position P"};
        if(output.split("P").length < 4) return {pass:false,msg:"Should show grid after each of 4 states"};
        return {pass:true,msg:"Movement system works!"};
      }
    }
  ]
},
// ── Level 11: Advanced Concepts ──
{
  id:11, title:"Advanced Concepts", desc:"Comprehensions, exceptions, lambda",
  challenges:[
    {
      id:"11.1", title:"Comprehensions", xp:15,
      instructions:`<p>List comprehensions are a compact way to create lists:</p>
<pre><code># Instead of:
squares = []
for x in range(5):
    squares.append(x ** 2)

# Write:
squares = [x ** 2 for x in range(5)]

# With filter:
evens = [x for x in range(10) if x % 2 == 0]</code></pre>
<p><b>Your task:</b> Use list comprehensions to create and print:</p>
<p>1. Squares of 1-10: <code>[1, 4, 9, 16, ..., 100]</code><br>
2. Only damage values above 50 from the given list<br>
3. Names converted to uppercase</p>`,
      starter:'damage_rolls = [23, 67, 45, 89, 12, 56, 78, 34]\nnames = ["aria", "rex", "luna"]\n\n# 1. Squares of 1-10\n\n# 2. Damage values above 50\n\n# 3. Names in uppercase\n',
      hints:["squares = [x**2 for x in range(1, 11)]","high_damage = [d for d in damage_rolls if d > 50]","upper_names = [n.upper() for n in names]"],
      check(output){
        if(!output.includes("100")) return {pass:false,msg:"Squares should include 100"};
        if(!output.includes("67") || !output.includes("89")) return {pass:false,msg:"High damage should include 67, 89, 56, 78"};
        if(!output.includes("ARIA") || !output.includes("REX")) return {pass:false,msg:"Names should be uppercase"};
        return {pass:true,msg:"Comprehensions mastered!"};
      }
    },
    {
      id:"11.2", title:"Try / Except", xp:15,
      instructions:`<p>Error handling prevents crashes:</p>
<pre><code>try:
    result = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero!")
except ValueError:
    print("Invalid value!")
finally:
    print("This always runs")</code></pre>
<p><b>Your task:</b> Write a function <code>safe_divide(a, b)</code> that returns a/b but handles ZeroDivisionError by returning 0 and printing a warning. Also write <code>parse_int(text)</code> that converts text to int but handles ValueError. Test both.</p>`,
      starter:'# Define safe_divide\n\n\n# Define parse_int\n\n\n# Tests\nprint(safe_divide(10, 3))\nprint(safe_divide(10, 0))\nprint(parse_int("42"))\nprint(parse_int("abc"))\n',
      hints:["try: return a / b except ZeroDivisionError: print warning, return 0","try: return int(text) except ValueError: print warning, return None","Remember to include the return value in all cases"],
      check(output){
        const o=output.trim();
        if(!o.includes("3.3") && !o.includes("3.33")) return {pass:false,msg:"10/3 should be ~3.33"};
        if(!o.includes("0") || (!o.includes("zero") && !o.includes("Zero") && !o.includes("cannot") && !o.includes("Cannot") && !o.includes("warning") && !o.includes("Warning") && !o.includes("error") && !o.includes("Error"))) return {pass:false,msg:"Division by zero should return 0 with a warning"};
        if(!o.includes("42")) return {pass:false,msg:'parse_int("42") should return 42'};
        return {pass:true,msg:"Error handling works!"};
      }
    },
    {
      id:"11.3", title:"Lambda & Map", xp:20,
      instructions:`<p>Lambda functions are small anonymous functions:</p>
<pre><code># Regular function
def double(x):
    return x * 2

# Same as lambda
double = lambda x: x * 2

# map() applies a function to every item
list(map(lambda x: x * 2, [1, 2, 3]))  # [2, 4, 6]

# filter() keeps items where function returns True
list(filter(lambda x: x > 5, [3, 7, 2, 9]))  # [7, 9]

# sorted() with custom key
sorted(players, key=lambda p: p["level"], reverse=True)</code></pre>
<p><b>Your task:</b> Using lambda, map, filter, and sorted:</p>
<p>1. Double all XP values in a list<br>
2. Filter players with level > 5<br>
3. Sort players by HP (descending)</p>`,
      starter:'xp_values = [100, 250, 50, 400, 175]\nplayers = [\n    {"name": "Aria", "level": 8, "hp": 90},\n    {"name": "Rex", "level": 3, "hp": 120},\n    {"name": "Luna", "level": 6, "hp": 75},\n    {"name": "Kai", "level": 2, "hp": 110}\n]\n\n# 1. Double XP values\n\n# 2. Filter players with level > 5\n\n# 3. Sort players by HP descending\n',
      hints:["doubled = list(map(lambda x: x * 2, xp_values))",'high_level = list(filter(lambda p: p["level"] > 5, players))','sorted_players = sorted(players, key=lambda p: p["hp"], reverse=True)'],
      check(output){
        if(!output.includes("200") || !output.includes("800")) return {pass:false,msg:"Doubled XP should include 200, 500, 100, 800, 350"};
        if(!output.includes("Aria") || !output.includes("Luna")) return {pass:false,msg:"High level players: Aria (8) and Luna (6)"};
        return {pass:true,msg:"Functional programming unlocked!"};
      }
    }
  ]
},
// ── Level 12: Final Challenges ──
{
  id:12, title:"Final Challenges", desc:"Putting it all together",
  challenges:[
    {
      id:"12.1", title:"Mini Calculator", xp:20,
      instructions:`<p>Combine everything you've learned to build a working calculator.</p>
<p><b>Your task:</b> Write a function <code>calculate(expression)</code> that takes a string like <code>"5 + 3"</code> and returns the result. Support: +, -, *, /</p>
<p>Handle division by zero. Test with all four operations.</p>
<pre><code>print(calculate("10 + 5"))   # 15.0
print(calculate("20 - 8"))   # 12.0
print(calculate("6 * 7"))    # 42.0
print(calculate("15 / 4"))   # 3.75</code></pre>`,
      starter:'def calculate(expression):\n    # Split the expression and compute\n    pass\n\nprint(calculate("10 + 5"))\nprint(calculate("20 - 8"))\nprint(calculate("6 * 7"))\nprint(calculate("15 / 4"))\n',
      hints:["Split: parts = expression.split(); a = float(parts[0]); op = parts[1]; b = float(parts[2])","Use if/elif for each operator: +, -, *, /","For division: check if b == 0 first"],
      check(output){
        const lines=output.trim().split('\n').map(s=>s.trim());
        const vals=lines.map(Number);
        if(vals[0]!==15) return {pass:false,msg:"10 + 5 should be 15"};
        if(vals[1]!==12) return {pass:false,msg:"20 - 8 should be 12"};
        if(vals[2]!==42) return {pass:false,msg:"6 * 7 should be 42"};
        if(vals[3]!==3.75) return {pass:false,msg:"15 / 4 should be 3.75"};
        return {pass:true,msg:"Calculator works!"};
      }
    },
    {
      id:"12.2", title:"RPG Combat System", xp:25,
      instructions:`<p>Build a turn-based combat system using OOP, loops, and functions!</p>
<p><b>Your task:</b> Create a <code>Fighter</code> class and simulate a battle:</p>
<p>&bull; Fighter has: name, hp, attack, defense<br>
&bull; damage = max(0, attacker.attack - defender.defense)<br>
&bull; Fight until one reaches 0 HP<br>
&bull; Print each round and the winner</p>
<p>Expected output pattern:</p>
<pre><code>Round 1: Hero attacks Dragon for 12 damage! Dragon HP: 88
Round 1: Dragon attacks Hero for 18 damage! Hero HP: 82
...
Hero wins with 24 HP remaining!</code></pre>`,
      starter:'import random\n\nclass Fighter:\n    def __init__(self, name, hp, attack, defense):\n        self.name = name\n        self.hp = hp\n        self.attack = attack\n        self.defense = defense\n\n    # Add methods for combat\n\n\n# Create fighters and run the battle\nhero = Fighter("Hero", 100, 22, 8)\ndragon = Fighter("Dragon", 120, 20, 5)\n\n# Battle loop\n',
      hints:["Add a take_hit method that calculates and applies damage","Use a while loop: while hero.hp > 0 and dragon.hp > 0:","After the loop, check who has HP left and print the winner"],
      check(output){
        const o=output.trim();
        if(!o.includes("Round") && !o.includes("round")) return {pass:false,msg:"Should print round numbers"};
        if(!o.includes("wins") && !o.includes("victory") && !o.includes("Victory") && !o.includes("won")) return {pass:false,msg:"Should declare a winner"};
        if(!o.includes("damage")) return {pass:false,msg:"Should show damage dealt each round"};
        return {pass:true,msg:"Epic battle complete!"};
      }
    },
    {
      id:"12.3", title:"High Score Table", xp:25,
      instructions:`<p>Combine lists, dicts, sorting, and functions to build a high score system.</p>
<p><b>Your task:</b> Create functions for a high score table:</p>
<p>1. <code>add_score(table, name, score)</code> - adds a new entry<br>
2. <code>get_top(table, n)</code> - returns top n scores (sorted by score, descending)<br>
3. <code>find_player(table, name)</code> - finds a player's best score<br>
4. <code>display(table)</code> - prints formatted table</p>
<p>Add at least 5 scores, display top 3, and find one player.</p>`,
      starter:'# Define high score functions\n\n\n# Build and display the table\nscores = []\nadd_score(scores, "Aria", 9500)\nadd_score(scores, "Rex", 7200)\nadd_score(scores, "Luna", 8800)\nadd_score(scores, "Kai", 6500)\nadd_score(scores, "Zoe", 9100)\n\nprint("=== TOP 3 ===")\ntop3 = get_top(scores, 3)\ndisplay(top3)\n\nprint(f"\\nAria\'s score: {find_player(scores, \'Aria\')}")\n',
      hints:['add_score: table.append({"name": name, "score": score})',"get_top: return sorted(table, key=lambda x: x['score'], reverse=True)[:n]","find_player: loop through table, return score if name matches"],
      check(output){
        if(!output.includes("TOP 3") && !output.includes("top 3")) return {pass:false,msg:"Should display top 3 header"};
        if(!output.includes("Aria") || !output.includes("9500")) return {pass:false,msg:"Aria with 9500 should appear"};
        if(!output.includes("Zoe") || !output.includes("Luna")) return {pass:false,msg:"Zoe and Luna should be in top 3"};
        return {pass:true,msg:"High score system complete! Congratulations - you've finished PyForge!"};
      }
    }
  ]
}
];

// ─── Achievements ───
const ACHIEVEMENTS = [
  {id:"first_steps", icon:"\u{1f476}", name:"First Steps", desc:"Complete your first challenge", check: s => s.completed.length >= 1},
  {id:"loop_master", icon:"\u{1f504}", name:"Loop Master", desc:"Complete all Loop challenges", check: s => ["3.1","3.2","3.3","3.4"].every(c => s.completed.includes(c))},
  {id:"oop_wizard", icon:"\u{1f9d9}", name:"OOP Wizard", desc:"Complete all OOP challenges", check: s => ["8.1","8.2","8.3","8.4"].every(c => s.completed.includes(c))},
  {id:"halfway", icon:"\u{1f3c3}", name:"Halfway There", desc:"Complete 6 levels", check: s => { const done = new Set(); s.completed.forEach(c => done.add(c.split('.')[0])); return done.size >= 6; }},
  {id:"python_pro", icon:"\u{1f3c6}", name:"Python Pro", desc:"Complete all challenges", check: s => { let total = 0; LEVELS.forEach(l => total += l.challenges.length); return s.completed.length >= total; }},
  {id:"hint_free", icon:"\u{1f4aa}", name:"No Hints Needed", desc:"Complete 5 challenges without using hints", check: s => (s.hintFreeCount || 0) >= 5},
  {id:"bug_squasher", icon:"\u{1f41b}", name:"Bug Squasher", desc:"Fix 10 errors and get them right", check: s => (s.errorFixCount || 0) >= 10},
];

const SOLUTIONS = {
"1.1": 'print("Hello, World!")',
"1.2": 'player_name = "Hero"\nplayer_hp = 100\nplayer_level = 1.5\n\nprint(player_name)\nprint(player_hp)\nprint(player_level)',
"1.3": 'base_attack = 25\nmultiplier = 3\nbonus = 10\n\ndamage = base_attack * multiplier + bonus\nprint(damage)',
"1.4": 'name = "Blade"\nplayer_class = "Warrior"\nhp = 120\nattack = 25\n\nprint("=== PLAYER CARD ===")\nprint(f"Name: {name}")\nprint(f"Class: {player_class}")\nprint(f"HP: {hp}")\nprint(f"Attack: {attack}")',
"2.1": 'hp = 50\n\nif hp > 0:\n    print("Alive")\nelse:\n    print("Game Over")',
"2.2": 'score = 75\n\nif score >= 90:\n    print("Legendary")\nelif score >= 70:\n    print("Epic")\nelif score >= 40:\n    print("Rare")\nelse:\n    print("Common")',
"2.3": 'gold = 80\nlevel = 3\n\nif gold >= 50 and level >= 5:\n    print("Purchase complete!")\nelse:\n    print("Cannot buy this item.")',
"2.4": 'player = "rock"\ncomputer = "scissors"\n\nif player == computer:\n    print("Draw!")\nelif (player == "rock" and computer == "scissors") or \\\n     (player == "scissors" and computer == "paper") or \\\n     (player == "paper" and computer == "rock"):\n    print("Player wins!")\nelse:\n    print("Computer wins!")',
"3.1": 'count = 10\nwhile count > 0:\n    print(count)\n    count -= 1\nprint("Liftoff!")',
"3.2": 'for i in range(1, 6):\n    print(f"Roll {i}: {i * 10} damage")',
"3.3": 'enemies = ["Goblin", "Dark Knight", "Slime", "Dark Mage", "Wolf", "Dark Dragon"]\n\nfor enemy in enemies:\n    if enemy.startswith("Dark"):\n        print(enemy)',
"3.4": 'for row in range(1, 6):\n    for col in range(1, 6):\n        print(row * col, end="  ")\n    print()',
"4.1": 'import random\n\ndef roll_dice(sides):\n    return random.randint(1, sides)\n\nprint(roll_dice(6))\nprint(roll_dice(6))\nprint(roll_dice(6))',
"4.2": 'def calculate_damage(base, multiplier=1.0, bonus=0):\n    return base * multiplier + bonus\n\nprint(calculate_damage(20))\nprint(calculate_damage(20, 1.5))\nprint(calculate_damage(20, 2.0, 10))',
"4.3": 'def display_health(name, current, maximum):\n    filled = int(20 * current / maximum)\n    bar = "#" * filled + "-" * (20 - filled)\n    print(f"{name}: [{bar}] {current}/{maximum} HP")\n\ndisplay_health("Hero", 50, 100)\ndisplay_health("Boss", 75, 150)',
"4.4": 'def calculate_damage(attack, defense):\n    return max(0, attack - defense)\n\ndef battle_round(atk_name, atk_power, def_name, def_armor, def_hp):\n    dmg = calculate_damage(atk_power, def_armor)\n    remaining = def_hp - dmg\n    print(f"{atk_name} attacks {def_name} for {dmg} damage!")\n    print(f"{def_name} HP: {remaining}/{def_hp}")\n    return remaining\n\nremaining = battle_round("Hero", 20, "Goblin", 8, 30)\nprint(f"Remaining: {remaining}")',
"5.1": 'inventory = ["sword", "shield", "potion"]\ninventory.append("bow")\ninventory.remove("shield")\nprint(inventory)\nprint(len(inventory))',
"5.2": 'damage_rolls = [45, 12, 78, 33, 91, 27, 56]\nprint(min(damage_rolls))\nprint(max(damage_rolls))\nprint(sorted(damage_rolls))',
"5.3": 'party = [\n    {"name": "Aria", "class": "Mage", "level": 5},\n    {"name": "Rex", "class": "Warrior", "level": 3},\n    {"name": "Luna", "class": "Rogue", "level": 7}\n]\n\nfor i, m in enumerate(party, 1):\n    print(f"{i}. {m[\'name\']} the {m[\'class\']} (Level {m[\'level\']})")',
"5.4": 'skills = ["Fire", "Ice", "Thunder", "Heal", "Shield", "Dash"]\nprint(skills[:3])\nprint(skills[-2:])\nprint(skills[::2])',
"6.1": 'player = {\n    "name": "Shadow",\n    "char_class": "Rogue",\n    "hp": 80,\n    "attack": 22,\n    "defense": 8\n}\n\nprint(f"Name: {player[\'name\']}")\nprint(f"Class: {player[\'char_class\']}")\nprint(f"HP: {player[\'hp\']}")\nprint(f"Attack: {player[\'attack\']}")\nprint(f"Defense: {player[\'defense\']}")',
"6.2": 'inventory = {"potion": 3, "arrow": 10, "bomb": 1}\ninventory["potion"] += 2\ninventory["arrow"] -= 5\ninventory["shield"] = 1\n\nfor item, count in inventory.items():\n    print(f"{item}: {count}")',
"6.3": 'game = {\n    "player": {\n        "name": "Hero",\n        "stats": {"hp": 100, "mp": 50, "attack": 20},\n        "equipment": {\n            "weapon": {"name": "Iron Sword", "damage": 15},\n            "armor": {"name": "Leather", "defense": 5}\n        }\n    }\n}\n\nprint(f"Player: {game[\'player\'][\'name\']}")\nprint(f"HP: {game[\'player\'][\'stats\'][\'hp\']}")\nprint(f"Weapon: {game[\'player\'][\'equipment\'][\'weapon\'][\'name\']}")\nprint(f"Weapon Damage: {game[\'player\'][\'equipment\'][\'weapon\'][\'damage\']}")',
"6.4": 'bestiary = {\n    "Goblin": {"type": "ground", "hp": 30, "danger": "low"},\n    "Dragon": {"type": "flying", "hp": 200, "danger": "extreme"},\n    "Slime": {"type": "ground", "hp": 15, "danger": "harmless"}\n}\n\nfor name, info in bestiary.items():\n    print(f"--- {name} ---")\n    print(f"Type: {info[\'type\']}")\n    print(f"HP: {info[\'hp\']}")\n    print(f"Danger: {info[\'danger\']}")',
"7.1": 'message = "/attack dragon"\n\nif message.startswith("/"):\n    parts = message.split()\n    command = parts[0][1:]\n    args = " ".join(parts[1:])\n    print(f"Command: {command}")\n    print(f"Args: {args}")\nelse:\n    print(f"Chat: {message}")',
"7.2": 'def encrypt(text, shift):\n    result = ""\n    for char in text:\n        if char.isupper():\n            result += chr((ord(char) - 65 + shift) % 26 + 65)\n        elif char.islower():\n            result += chr((ord(char) - 97 + shift) % 26 + 97)\n        else:\n            result += char\n    return result\n\nprint(encrypt("HELLO", 3))\nprint(encrypt("abc", 1))',
"7.3": 'text = "the dragon fought the knight and the knight won the battle"\nwords = text.lower().split()\ncounts = {}\nfor word in words:\n    if word in counts:\n        counts[word] += 1\n    else:\n        counts[word] = 1\n\nfor word, count in sorted(counts.items(), key=lambda x: x[1], reverse=True):\n    print(f"{word}: {count}")',
"8.1": 'class Player:\n    def __init__(self, name, hp):\n        self.name = name\n        self.hp = hp\n\n    def greet(self):\n        print(f"I am {self.name} with {self.hp} HP!")\n\nplayer = Player("Hero", 100)\nplayer.greet()',
"8.2": 'class Player:\n    def __init__(self, name, hp):\n        self.name = name\n        self.hp = hp\n\n    def take_damage(self, amount):\n        self.hp = max(0, self.hp - amount)\n        print(f"{self.name} takes {amount} damage!")\n\n    def attack(self, other):\n        print(f"{self.name} attacks {other.name}!")\n        other.take_damage(10)\n\nhero = Player("Hero", 50)\nenemy = Player("Goblin", 30)\nhero.attack(enemy)\nenemy.attack(hero)\nprint(f"{hero.name}: {hero.hp} HP")\nprint(f"{enemy.name}: {enemy.hp} HP")',
"8.3": 'class Player:\n    def __init__(self, name, char_class, hp):\n        self.name = name\n        self.char_class = char_class\n        self.max_hp = hp\n        self.hp = hp\n\n    def __str__(self):\n        return f"[{self.char_class}] {self.name} - HP: {self.hp}/{self.max_hp}"\n\nplayer = Player("Hero", "Warrior", 100)\nprint(player)',
"8.4": 'class Item:\n    def __init__(self, name, value):\n        self.name = name\n        self.value = value\n    def __str__(self):\n        return f"{self.name} (value: {self.value} gold)"\n\nclass Weapon(Item):\n    def __init__(self, name, value, damage):\n        super().__init__(name, value)\n        self.damage = damage\n    def __str__(self):\n        return f"{self.name} - {self.damage} damage (value: {self.value} gold)"\n\nclass Potion(Item):\n    def __init__(self, name, value, heal_amount):\n        super().__init__(name, value)\n        self.heal_amount = heal_amount\n    def __str__(self):\n        return f"{self.name} - heals {self.heal_amount} HP (value: {self.value} gold)"\n\nsword = Weapon("Iron Sword", 50, 15)\npotion = Potion("Health Potion", 20, 30)\nprint(sword)\nprint(potion)',
"9.1": 'class Character:\n    def __init__(self, name, hp, attack):\n        self.name = name\n        self.hp = hp\n        self.attack = attack\n\n    def info(self):\n        print(f"{self.name} - HP: {self.hp}, ATK: {self.attack}")\n\nclass Warrior(Character):\n    def __init__(self, name):\n        super().__init__(name, 120, 15)\n\n    def special_ability(self):\n        print(f"{self.name} uses Shield Bash!")\n\nclass Mage(Character):\n    def __init__(self, name):\n        super().__init__(name, 70, 25)\n\n    def special_ability(self):\n        print(f"{self.name} casts Fireball!")\n\nw = Warrior("Rex")\nm = Mage("Aria")\nw.info()\nw.special_ability()\nm.info()\nm.special_ability()',
"9.2": 'class Character:\n    def __init__(self, name, hp, attack):\n        self.name = name\n        self.hp = hp\n        self.attack = attack\n\n    def take_damage(self, amount):\n        self.hp = max(0, self.hp - amount)\n        print(f"{self.name} takes {amount} damage! HP: {self.hp}")\n\n    def attack_target(self, target):\n        target.take_damage(self.attack)\n\nclass Warrior(Character):\n    def __init__(self, name):\n        super().__init__(name, 120, 15)\n\n    def attack_target(self, target):\n        dmg = self.attack + 5\n        print(f"{self.name} swings sword!")\n        target.take_damage(dmg)\n\nclass Mage(Character):\n    def __init__(self, name):\n        super().__init__(name, 70, 25)\n\n    def attack_target(self, target):\n        dmg = self.attack * 2\n        print(f"{self.name} casts spell!")\n        target.take_damage(dmg)\n\nw = Warrior("Rex")\nm = Mage("Aria")\nw.attack_target(m)\nm.attack_target(w)\nprint(f"\\n{w.name}: {w.hp} HP | {m.name}: {m.hp} HP")',
"9.3": 'class Character:\n    def __init__(self, name, hp, attack):\n        self.name = name\n        self.hp = hp\n        self.attack = attack\n\n    def take_damage(self, amount):\n        self.hp = max(0, self.hp - amount)\n        print(f"{self.name} takes {amount} damage! HP: {self.hp}")\n\nclass BossEnemy(Character):\n    def __init__(self, name, hp, attack):\n        super().__init__(name, hp, attack)\n        self.phase = 1\n        self.rage = 0\n\n    def take_damage(self, amount):\n        super().take_damage(amount)\n        self.rage += 5\n        if self.rage >= 20:\n            print("BOSS ENRAGED!")\n            self.rage = 0\n\nboss = BossEnemy("Dark Lord", 200, 30)\nfor i in range(5):\n    boss.take_damage(10)',
"10.1": 'grid = [["." for _ in range(5)] for _ in range(5)]\ngrid[2][2] = "P"\n\nfor row in grid:\n    print(" ".join(row))',
"10.2": 'grid = [\n    [".", "T", ".", ".", "."],\n    [".", ".", ".", "T", "."],\n    ["T", ".", ".", ".", "."],\n    [".", ".", "T", ".", "T"],\n    [".", ".", ".", ".", "."]\n]\n\ndef count_adjacent_treasures(grid, row, col):\n    count = 0\n    for dr in [-1, 0, 1]:\n        for dc in [-1, 0, 1]:\n            if dr == 0 and dc == 0:\n                continue\n            nr, nc = row + dr, col + dc\n            if 0 <= nr < len(grid) and 0 <= nc < len(grid[0]):\n                if grid[nr][nc] == "T":\n                    count += 1\n    return count\n\nprint(count_adjacent_treasures(grid, 1, 1))\nprint(count_adjacent_treasures(grid, 2, 1))',
"10.3": 'grid = [\n    ["#", "#", "#", "#", "#"],\n    ["#", ".", ".", ".", "#"],\n    ["#", ".", "#", ".", "#"],\n    ["#", ".", ".", ".", "#"],\n    ["#", "#", "#", "#", "#"]\n]\n\ndef print_grid(grid, pos):\n    for r in range(len(grid)):\n        row = ""\n        for c in range(len(grid[r])):\n            if (r, c) == pos:\n                row += "P "\n            else:\n                row += grid[r][c] + " "\n        print(row.strip())\n    print()\n\ndef move(grid, pos, direction):\n    dirs = {"up":(-1,0), "down":(1,0), "left":(0,-1), "right":(0,1)}\n    dr, dc = dirs[direction]\n    nr, nc = pos[0] + dr, pos[1] + dc\n    if 0 <= nr < len(grid) and 0 <= nc < len(grid[0]) and grid[nr][nc] != "#":\n        return (nr, nc)\n    else:\n        print("Blocked!")\n        return pos\n\npos = (1, 1)\nprint_grid(grid, pos)\npos = move(grid, pos, "right")\nprint_grid(grid, pos)\npos = move(grid, pos, "right")\nprint_grid(grid, pos)\npos = move(grid, pos, "down")\nprint_grid(grid, pos)',
"11.1": 'damage_rolls = [23, 67, 45, 89, 12, 56, 78, 34]\nnames = ["aria", "rex", "luna"]\n\nsquares = [x**2 for x in range(1, 11)]\nprint(squares)\n\nhigh_damage = [d for d in damage_rolls if d > 50]\nprint(high_damage)\n\nupper_names = [n.upper() for n in names]\nprint(upper_names)',
"11.2": 'def safe_divide(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        print("Warning: division by zero!")\n        return 0\n\ndef parse_int(text):\n    try:\n        return int(text)\n    except ValueError:\n        print("Warning: invalid integer!")\n        return None\n\nprint(safe_divide(10, 3))\nprint(safe_divide(10, 0))\nprint(parse_int("42"))\nprint(parse_int("abc"))',
"11.3": 'xp_values = [100, 250, 50, 400, 175]\nplayers = [\n    {"name": "Aria", "level": 8, "hp": 90},\n    {"name": "Rex", "level": 3, "hp": 120},\n    {"name": "Luna", "level": 6, "hp": 75},\n    {"name": "Kai", "level": 2, "hp": 110}\n]\n\ndoubled = list(map(lambda x: x * 2, xp_values))\nprint(doubled)\n\nhigh_level = list(filter(lambda p: p["level"] > 5, players))\nfor p in high_level:\n    print(f"{p[\"name\"]} (Level {p[\"level\"]})")\n\nsorted_players = sorted(players, key=lambda p: p["hp"], reverse=True)\nfor p in sorted_players:\n    print(f"{p[\"name\"]}: {p[\"hp\"]} HP")',
"12.1": 'def calculate(expression):\n    parts = expression.split()\n    a = float(parts[0])\n    op = parts[1]\n    b = float(parts[2])\n    if op == "+": return a + b\n    elif op == "-": return a - b\n    elif op == "*": return a * b\n    elif op == "/":\n        if b == 0: return "Error: division by zero"\n        return a / b\n    return "Unknown operator"\n\nprint(calculate("10 + 5"))\nprint(calculate("20 - 8"))\nprint(calculate("6 * 7"))\nprint(calculate("15 / 4"))',
"12.2": 'import random\n\nclass Fighter:\n    def __init__(self, name, hp, attack, defense):\n        self.name = name\n        self.hp = hp\n        self.attack = attack\n        self.defense = defense\n\n    def take_hit(self, damage):\n        actual = max(0, damage - self.defense)\n        self.hp = max(0, self.hp - actual)\n        return actual\n\nhero = Fighter("Hero", 100, 22, 8)\ndragon = Fighter("Dragon", 120, 20, 5)\n\nround_num = 1\nwhile hero.hp > 0 and dragon.hp > 0:\n    dmg = hero.take_hit(0)  # placeholder\n    h_dmg = random.randint(hero.attack - 5, hero.attack + 5)\n    actual = dragon.take_hit(h_dmg)\n    print(f"Round {round_num}: {hero.name} attacks {dragon.name} for {actual} damage! {dragon.name} HP: {dragon.hp}")\n    if dragon.hp <= 0:\n        break\n    d_dmg = random.randint(dragon.attack - 5, dragon.attack + 5)\n    actual = hero.take_hit(d_dmg)\n    print(f"Round {round_num}: {dragon.name} attacks {hero.name} for {actual} damage! {hero.name} HP: {hero.hp}")\n    round_num += 1\n\nwinner = hero.name if hero.hp > 0 else dragon.name\nwp = hero.hp if hero.hp > 0 else dragon.hp\nprint(f"\\n{winner} wins with {wp} HP remaining!")',
"12.3": 'scores = []\n\ndef add_score(table, name, score):\n    table.append({"name": name, "score": score})\n\ndef get_top(table, n):\n    return sorted(table, key=lambda x: x["score"], reverse=True)[:n]\n\ndef find_player(table, name):\n    for entry in table:\n        if entry["name"] == name:\n            return entry["score"]\n    return None\n\ndef display(table):\n    for i, entry in enumerate(table, 1):\n        print(f"  {i}. {entry[\"name\"]}: {entry[\"score\"]}")\n\nadd_score(scores, "Aria", 9500)\nadd_score(scores, "Rex", 7200)\nadd_score(scores, "Luna", 8800)\nadd_score(scores, "Kai", 6500)\nadd_score(scores, "Zoe", 9100)\n\nprint("=== TOP 3 ===")\ntop3 = get_top(scores, 3)\ndisplay(top3)\n\nprint(f"\\nAria\'s score: {find_player(scores, \'Aria\')}")',
};

// ─── Didactic data per level ───
const DIDACTICS = {
  1: {
    notes: "This level introduces the absolute basics. Students often struggle with: syntax (missing quotes, wrong parentheses), understanding that = is assignment not equality, and forgetting to call print(). Let students experiment freely \u2014 even \u201cwrong\u201d outputs teach them something.",
    errors: "<b>Forgetting quotes:</b> <code>print(Hello)</code> \u2192 NameError. Remind: text needs quotes.<br><b>Using = instead of ==:</b> Not relevant yet, but some may try comparisons early.<br><b>Type confusion:</b> <code>\"100\" + 1</code> fails \u2014 strings and ints don\u2019t mix.<br><b>f-string syntax:</b> Forgetting the <code>f</code> prefix, or using wrong braces.",
    differentiation: "<b>Faster students:</b> Ask them to add ASCII art to their player card, or calculate more complex formulas.<br><b>Struggling students:</b> Let them copy the example first, then modify one thing at a time. Typing code matters more than inventing it at this stage."
  },
  2: {
    notes: "Decision logic is where real programming starts. Key insight: computers can only compare, not \u201cunderstand\u201d. Emphasize that indentation matters in Python \u2014 it defines code blocks. The rock-paper-scissors challenge is intentionally complex to show why structured thinking matters.",
    errors: "<b>Indentation errors:</b> Mixing tabs and spaces, or forgetting to indent after <code>if:</code><br><b>Using = instead of ==:</b> The #1 beginner error in conditionals.<br><b>Forgetting colons:</b> <code>if x > 0</code> without the trailing <code>:</code><br><b>Logic order:</b> In elif chains, checking from lowest to highest gives wrong results.",
    differentiation: "<b>Faster students:</b> Add more game logic \u2014 a full damage type system (fire > ice > nature > fire).<br><b>Struggling students:</b> Draw flowcharts first, then translate to code. Visual thinking helps."
  },
  3: {
    notes: "Loops are often the first \u201caha moment\u201d for students \u2014 the computer does repetitive work. Watch for infinite loops (missing counter update). The nested loop challenge is deliberately harder; it\u2019s okay if students need more time here.",
    errors: "<b>Infinite loops:</b> Forgetting <code>count -= 1</code> in while loops. Teach Ctrl+C (or the browser will hang).<br><b>Off-by-one errors:</b> <code>range(5)</code> gives 0-4, not 1-5.<br><b>Modifying list during iteration:</b> Not yet, but comes up later.<br><b>Indentation in nested loops:</b> Which code belongs to which loop?",
    differentiation: "<b>Faster students:</b> Challenge them to create a pattern with nested loops (triangle, diamond).<br><b>Struggling students:</b> Use Python Tutor (pythontutor.com) to visualize each loop step."
  },
  4: {
    notes: "Functions are about abstraction and reusability. The key mental shift: writing code that will be used later, not just right now. Emphasize the difference between <code>return</code> (gives data back) and <code>print</code> (shows on screen). Many beginners confuse the two.",
    errors: "<b>return vs print:</b> Using <code>print()</code> inside function instead of <code>return</code>, then wondering why the result is <code>None</code>.<br><b>Forgetting to call:</b> Defining a function but never calling it.<br><b>Scope confusion:</b> Variables inside functions are local.<br><b>Missing return:</b> Function returns <code>None</code> by default.",
    differentiation: "<b>Faster students:</b> Ask them to build a mini-library of game utility functions.<br><b>Struggling students:</b> Compare functions to recipes: inputs (ingredients), process (steps), output (dish)."
  },
  5: {
    notes: "Lists are the first data structure. Key concepts: indexing starts at 0, lists are mutable, and methods modify in-place. The enumerate() pattern is important but often confusing at first. Let students print intermediate results to build intuition.",
    errors: "<b>Index 0:</b> First item is <code>lst[0]</code>, not <code>lst[1]</code>.<br><b>IndexError:</b> Accessing beyond list length.<br><b>sort() vs sorted():</b> <code>sort()</code> modifies in-place and returns None. <code>sorted()</code> returns a new list.<br><b>Mutable gotcha:</b> <code>a = b = []</code> creates one list, not two.",
    differentiation: "<b>Faster students:</b> Implement a stack (append/pop) or queue for game events.<br><b>Struggling students:</b> Visualize lists as numbered boxes. Draw them on paper."
  },
  6: {
    notes: "Dictionaries model real-world data. The key insight: you look things up by name, not position. Nested dicts are powerful but can be confusing \u2014 use step-by-step access. This level pairs well with JSON if students are curious about web data.",
    errors: "<b>KeyError:</b> Accessing a key that doesn\u2019t exist. Teach <code>.get(key, default)</code>.<br><b>Quote nesting:</b> <code>print(f\"{d['key']}\")</code> \u2014 mixing quote types is tricky.<br><b>Mutable default arguments:</b> Advanced, but watch for it.<br><b>Forgetting .items():</b> Looping a dict gives only keys by default.",
    differentiation: "<b>Faster students:</b> Build a full game item database with search functionality.<br><b>Struggling students:</b> Start with simple key-value pairs before introducing nesting."
  },
  7: {
    notes: "String processing is a practical skill used everywhere. The Caesar cipher is both fun and teaches ord()/chr() and modular arithmetic. The word counter introduces the counting pattern that\u2019s fundamental to many algorithms.",
    errors: "<b>Immutability:</b> Strings can\u2019t be changed in-place. <code>s[0] = \"X\"</code> fails.<br><b>Split behavior:</b> <code>\"a,,b\".split(\",\")</code> gives <code>[\"a\",\"\",\"b\"]</code>.<br><b>Modular arithmetic:</b> The <code>% 26</code> wrap-around in Caesar cipher is tricky.<br><b>Encoding:</b> <code>ord(\"A\")</code> is 65, <code>ord(\"a\")</code> is 97.",
    differentiation: "<b>Faster students:</b> Implement ROT13 or a Vigen\u00e8re cipher.<br><b>Struggling students:</b> Work through the Caesar cipher by hand with pen and paper first."
  },
  8: {
    notes: "OOP is the biggest conceptual leap. The metaphor of classes as blueprints and objects as instances works well. <code>self</code> is consistently confusing \u2014 explain it as \u201cthe specific object we\u2019re working with right now.\u201d Start with familiar examples (a Player in a game).",
    errors: "<b>Forgetting self:</b> Missing <code>self</code> parameter or <code>self.</code> prefix.<br><b>__init__ typo:</b> Wrong underscores or spelling.<br><b>Calling without ():</b> <code>player.greet</code> vs <code>player.greet()</code>.<br><b>Class vs instance:</b> Modifying the class vs modifying the object.",
    differentiation: "<b>Faster students:</b> Design a full game entity system with items, spells, status effects.<br><b>Struggling students:</b> Build the simplest possible class first (just name attribute), then add one feature at a time."
  },
  9: {
    notes: "Inheritance extends OOP thinking. Key idea: \u201cA Warrior IS-A Character with extra abilities.\u201d super() is the tricky part \u2014 it calls the parent\u2019s version. Method overriding lets subclasses customize behavior. Don\u2019t over-abstract at this level.",
    errors: "<b>super() syntax:</b> Forgetting parentheses or arguments.<br><b>Method resolution:</b> Which version gets called? The most specific one.<br><b>Over-inheritance:</b> Not everything needs to be a subclass.<br><b>Constructor chaining:</b> Forgetting super().__init__() means parent setup is skipped.",
    differentiation: "<b>Faster students:</b> Add a third subclass (Ranger?) with a unique mechanic.<br><b>Struggling students:</b> Trace through the code step by step, showing which method runs where."
  },
  10: {
    notes: "2D grids bring visual, spatial thinking into programming. This connects well to game development intuition. The coordinate system (row, col) can be confusing \u2014 row increases downward. Collision detection is a real game dev skill being practiced here.",
    errors: "<b>Row/column confusion:</b> grid[row][col], not grid[x][y]. Y-axis is inverted.<br><b>Boundary checks:</b> Forgetting to check if position is within grid bounds.<br><b>Reference vs copy:</b> <code>grid = [[\".\"] * 5] * 5</code> creates 5 references to the same row!<br><b>Separate collision checks:</b> Check horizontal and vertical separately.",
    differentiation: "<b>Faster students:</b> Implement a simple flood-fill algorithm or pathfinding.<br><b>Struggling students:</b> Draw the grid on graph paper and manually trace the coordinate math."
  },
  11: {
    notes: "These are power tools that make Python code more elegant. List comprehensions can be overwhelming \u2014 teach them as a natural evolution of the for-loop pattern. Error handling is essential for real-world code. Lambda is syntactic sugar, not a new concept.",
    errors: "<b>Comprehension readability:</b> Overly complex one-liners are worse than explicit loops.<br><b>Bare except:</b> <code>except:</code> catches everything, which hides bugs. Be specific.<br><b>Lambda scope:</b> Lambdas capture variables by reference, which can cause surprises in loops.<br><b>Map returns iterator:</b> Need <code>list()</code> to see results.",
    differentiation: "<b>Faster students:</b> Explore generator expressions and the itertools module.<br><b>Struggling students:</b> Write the explicit for-loop version first, then convert to a comprehension side by side."
  },
  12: {
    notes: "The final challenges combine everything. There is no single \u201cright\u201d solution \u2014 evaluate based on: Does it work? Is it readable? Did they use appropriate constructs? The RPG combat challenge especially allows creative solutions. Celebrate completions!",
    errors: "<b>Scope creep:</b> Students may try to build too much. Encourage minimal working version first.<br><b>Missing edge cases:</b> Division by zero, empty inputs, negative values.<br><b>Code organization:</b> Functions should be defined before they are called.<br><b>Testing:</b> Encourage students to test with different inputs.",
    differentiation: "<b>Faster students:</b> Extend the RPG with inventory, shops, or multiple enemies. Or start learning Pygame!<br><b>Struggling students:</b> Focus on the calculator challenge first \u2014 it\u2019s the most structured. Let them refer back to earlier solutions."
  }
};
