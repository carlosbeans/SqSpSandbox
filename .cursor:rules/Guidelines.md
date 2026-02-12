This project has access to a custom Design System called Rosetta that's installed via a private npm package. Files in the guidelines directory show how to use Rosetta.  
  
Always read:  
- All files with a name that starts overview-  
- All files in the design-tokens folder  
  
Read the files in the guidelines/components directory when you want to use the component with that name. For example, if you want to use Toast, read guidelines/components/toast.md. Additional context can be found by reading the code for the corresponding component in /node_modules/.  
  
## Component Usage Guidelines - READ THIS FIRST  
  
IMPORTANT: Do not delete ANY Rosetta packages. They have dependencies on each other and all of them MUST be kept.

IMPORTANT: Always prefer to use components from Rosetta if they exist. For example, prefer to use a Button component from Rosetta, rather than regular button components. 
  
IMPORTANT: Follow these steps IN ORDER before writing any code:  
  
Step 1: Read Overview Files (REQUIRED)  
Read ALL files with a name that starts with "overview-" in the guidelines directory:  
overview-setup.md  
overview-components.md  
overview-icons.md  
(And any other overview-*.md files)  
  
Step 2: Read Design Tokens (REQUIRED)  
Read ALL files in the design-tokens/ folder. Do NOT skip this step.  
  
Step 3: Plan what components you need to use (REQUIRED)  
  
Step 4: Read Component Guidelines BEFORE Using Components (REQUIRED)  
BEFORE using ANY component, you MUST read its guidelines file first:  
Using Button? → Read guidelines/components/button.md FIRST  
Using Toast? → Read guidelines/components/toast.md FIRST  
Using Input? → Read guidelines/components/input.md FIRST  
  
Step 5: Plan what icons you need to use (REQUIRED)  
Before using ANY icon, you must check to see if that icon exists in the Rosetta package. If it doesn't, pick a different icon and verify the new icon.  
  
DO NOT write code using a component until you have read its specific guidelines.