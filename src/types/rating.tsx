export type Rating = {
 menuId : number,
 orderItemId : number,
 rating : number,
 comment : string
};

export type MenuRating = {
  menu_id: number;
  _avg: {
    rating: number;
  };
  _count: {
    rating: number;
  };
};