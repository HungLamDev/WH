/* eslint-disable for-direction */


export const ListB5_F1: {
  width: string;
  height: string;
  Sum_Total: string;
  Rack_Total: string;
}[] = [];
let dem = 0;
for (let i = 66; i >= 1; i--) {
  const paddedIndex = i < 10 ? "0" + i : i;
  if (i < 45 && i > 40) {

    ListB5_F1.push({
      width: "100%",
      height: "100%",
      Sum_Total: "0",
      Rack_Total: "Pallet"
    });
    if (dem > 1) {
      ListB5_F1.push({
        width: "100%",
        height: "100%",
        Sum_Total: "0",
        Rack_Total: "Pallet"
      });
    }
    if (dem == 3) {
      ListB5_F1.push({
        width: "100%",
        height: "100%",
        Sum_Total: "0",
        Rack_Total: "bank"
      });
      ListB5_F1.push({
        width: "100%",
        height: "100%",
        Sum_Total: "0",
        Rack_Total: "bank"
      });
    }
    dem++

  } else {
    ListB5_F1.push({
      width: "100%",
      height: "100%",
      Sum_Total: "0",
      Rack_Total: "D" + paddedIndex
    });

  }
}
export const ListB5_F2: {
  width: string;
  height: string;
  Sum_Total: string;
  Rack_Total: string;
}[] = [];
for (let j = 0; j <= 5; j++) {
  ListB5_F2.push({
    width: "100%",
    height: "100%",
    Sum_Total: "0",
    Rack_Total: "Pallet",
  });
}

for (let i = 118; i >= 77; i--) {
  // const paddedIndex = i < 10 ? "0" + i : i;
  if (i == 116) {
    ListB5_F2.push({
      width: "100%",
      height: "100%",
      Sum_Total: "0",
      Rack_Total: "bank"
    });
    ListB5_F2.push({
      width: "100%",
      height: "100%",
      Sum_Total: "0",
      Rack_Total: "bank"
    });
  }
  ListB5_F2.push({
    width: "100%",
    height: "100%",
    Sum_Total: "0",
    Rack_Total: "D" + i,
  });

}


// export const ListB1_F1: {
//   width: string;
//   height: string;
//   Sum_Total: string;
//   Rack_Total: string;
// }[] = [];
// for (let i = 143; i >= 126; i--) {
//   const paddedIndex = i < 10 ? "0" + i : i;

//   ListB1_F1.push({
//     width: "100%",
//     height: "100%",
//     Sum_Total: "0",
//     Rack_Total: "D" + paddedIndex,
//   });
//   if (i == 126) {
//     ListB1_F1.push({
//       width: "100%",
//       height: "100%",
//       Sum_Total: "0",
//       Rack_Total: "Pallet",
//     });
//   }

// }

export const ListB1_F1 = [
  {
    width: "100%",
    height: "100%",
    Sum_Total: "0",
    Rack_Total: "D143",
  },
  {
    width: "100%",
    height: "100%",
    Sum_Total: "0",
    Rack_Total: "D142",
  },
  {
    width: "100%",
    height: "100%",
    Sum_Total: "0",
    Rack_Total: "D140",
  },
  {
    width: "100%",
    height: "100%",
    Sum_Total: "0",
    Rack_Total: "D141",
  },
  {
    width: "100%",
    height: "100%",
    Sum_Total: "0",
    Rack_Total: "D138",
  },
  {
    width: "100%",
    height: "100%",
    Sum_Total: "0",
    Rack_Total: "D139",
  },
  {
    width: "100%",
    height: "100%",
    Sum_Total: "0",
    Rack_Total: "D136",
  },
  {
    width: "100%",
    height: "100%",
    Sum_Total: "0",
    Rack_Total: "D137",
  },
  {
    width: "100%",
    height: "100%",
    Sum_Total: "0",
    Rack_Total: "D134",
  },
  {
    width: "100%",
    height: "100%",
    Sum_Total: "0",
    Rack_Total: "D135",
  },
  {
    width: "100%",
    height: "100%",
    Sum_Total: "0",
    Rack_Total: "D132",
  },
  {
    width: "100%",
    height: "100%",
    Sum_Total: "0",
    Rack_Total: "D133",
  },
  {
    width: "100%",
    height: "100%",
    Sum_Total: "0",
    Rack_Total: "D130",
  },
  {
    width: "100%",
    height: "100%",
    Sum_Total: "0",
    Rack_Total: "D131",
  },
  {
    width: "100%",
    height: "100%",
    Sum_Total: "0",
    Rack_Total: "D128",
  },
  {
    width: "100%",
    height: "100%",
    Sum_Total: "0",
    Rack_Total: "D129",
  },
  {
    width: "100%",
    height: "100%",
    Sum_Total: "0",
    Rack_Total: "D127",
  },{
    width: "100%",
    height: "100%",
    Sum_Total: "0",
    Rack_Total: "D127",
  },
  {
    width: "100%",
    height: "100%",
    Sum_Total: "0",
    Rack_Total: "D126",
  },
  {
    width: "100%",
    height: "100%",
    Sum_Total: "0",
    Rack_Total: "Pallet",
  },
]



