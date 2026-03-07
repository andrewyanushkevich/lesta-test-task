import type { Tank } from "./tanks.types";

export const MOCK_TANK_T34: Tank = {
  tank_id: 1,
  name: "Т-34",
  description:
    "Легенда советских бронетанковых войск. Самый массовый советский танк Второй мировой войны. С 1940 по 1944 год на различных заводах СССР было изготовлено 33805 машин трёх модификаций.",
  images: {
    small_icon:
      "http://api.tanki.su/static/2.77.0/wot/encyclopedia/vehicle/small/ussr-R04_T-34.png",
    contour_icon:
      "http://api.tanki.su/static/2.77.0/wot/encyclopedia/vehicle/contour/ussr-R04_T-34.png",
    big_icon:
      "http://api.tanki.su/static/2.77.0/wot/encyclopedia/vehicle/ussr-R04_T-34.png",
  },
  price_gold: 0,
  tier: 5,
  nation: "ussr",
  type: "mediumTank",
  short_name: "Т-34",
};

export const MOCK_TANK_M7_WAYFARER: Tank = {
  tank_id: 7940129,
  name: "M7 Wayfarer",
  description:
    "У врат на границе миров появляется осознание того, что нет ничего вечного. Здесь металл превращается в пыль, а пыль просто растворяется. Здесь разбиваются мечты, здесь тают надежды. За этой гранью нет ответов, нет смысла и нет никаких дорог. На той стороне лишь пустота, и она куда глубже и безрадостнее, чем бескрайний космос. Кто по доброй воли пройдёт эти ворота, которые открываются только в одну сторону? Кому не достаточно предупреждений, домыслов, слухов? И если на вашем жизненном пути останется лишь один последний шаг, неужели вы потратите его на пересечение этой границы?\n\nКонечно, потратите. Не сомневайтесь. Ведь в этот момент вы будете не одни.\n\nХарактеристики машины могут быть изменены без компенсации.",
  images: {
    small_icon:
      "http://api.tanki.su/static/2.77.0/wot/encyclopedia/vehicle/small/usa-A23_M7_med_02.png",
    contour_icon:
      "http://api.tanki.su/static/2.77.0/wot/encyclopedia/vehicle/contour/usa-A23_M7_med_02.png",
    big_icon:
      "http://api.tanki.su/static/2.77.0/wot/encyclopedia/vehicle/usa-A23_M7_med_02.png",
  },
  price_gold: 0,
  tier: 5,
  nation: "usa",
  type: "lightTank",
  short_name: "Wayfarer",
};

export const MOCK_TANK_AMX_50_100: Tank = {
  tank_id: 3137,
  name: "AMX 50 100",
  description:
    "Тяжёлый танк AMX 50 100 являлся дальнейшим развитием проекта M4. В 1949 году был построен первый экземпляр. Машина массой 55 тонн получила в качестве основного вооружения 100-мм пушку в башне качающегося типа. Машины испытывались с дизельным и бензиновым двигателями. Испытания проходили с 1950 по 1952 гг. Танк в серийное производство и на вооружение не поступил.",
  images: {
    small_icon:
      "http://api.tanki.su/static/2.77.0/wot/encyclopedia/vehicle/small/france-F08_AMX_50_100.png",
    contour_icon:
      "http://api.tanki.su/static/2.77.0/wot/encyclopedia/vehicle/contour/france-F08_AMX_50_100.png",
    big_icon:
      "http://api.tanki.su/static/2.77.0/wot/encyclopedia/vehicle/france-F08_AMX_50_100.png",
  },
  price_gold: 0,
  tier: 8,
  nation: "france",
  type: "heavyTank",
  short_name: "AMX 50 100",
};

export const MOCK_TANKS: Tank[] = [
  MOCK_TANK_T34,
  MOCK_TANK_M7_WAYFARER,
  MOCK_TANK_AMX_50_100,
];

