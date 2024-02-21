import { TreeNode } from "@/widgets";

export const BranchData: TreeNode = {
  name: 'Разрушение',
  disabled: true,
  children: [
    {
      name: 'Заморозка',
      emoji: '🧊️',
      children: [
        { name: 'A1' },
        { name: 'A2' },
        { name: 'A3' },
        {
          name: 'C',
          children: [
            {
              name: 'C1',
            },
            {
              name: 'D',
              children: [
                {
                  name: 'D1',
                },
                {
                  name: 'D2',
                },
                {
                  name: 'D3',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'Молния',
      emoji: '⚡️',
    },
    {
      name: 'Огонь',
      emoji: '🔥️',
      isActivated: true,
      children: [
        { name: 'B1' },
        { name: 'B2' },
        { name: 'B3' }
      ],
    },
  ],
};