const removeInvalid = <T>(arr: Array<T>) => arr.filter(Boolean);

export interface IToolbarConfigOption {
  supportImage?: boolean;
  supportVideo?: boolean;
  customConfig?: any[];
}
export const ToolbarConfig = ({
  supportImage,
  supportVideo,
  customConfig = [],
}: IToolbarConfigOption) => [
  ['bold', 'italic', 'underline', 'strike'],
  [
    {
      align: [],
    },
  ],
  [
    {
      list: 'ordered',
    },
    {
      list: 'bullet',
    },
  ],
  [
    {
      indent: '-1',
    },
    {
      indent: '+1',
    },
  ],
  [
    {
      size: ['small', false, 'large', 'huge'],
    },
  ],
  [
    {
      header: [1, 2, 3, 4, 5, 6, false],
    },
  ],
  removeInvalid(['link', supportImage && 'image', supportVideo && 'video']),
  [
    {
      color: [],
    },
    {
      background: [],
    },
  ],
  ['clean'],
  ...customConfig,
];
