const testingSync = {
  lists: [
    {
      title: "Not so Derrick",
      id: 0,
      cards: [
        {
          taskText: "default task card 1",
          listNumber: 0,
          timeId: 0
        },
        {
          taskText: "default task card 2",
          listNumber: 0,
          timeId: 1
        }
      ]
    }
  ]
};

// const [lists, setLists] = useState();
//   useEffect(() => importLists(), []);

//   const importLists = () => {
//     if (localStorage.getItem("lists")) {
//       console.log("It's here");
//       const localLists = localStorage.getItem("lists");
//       const localListsParsed = JSON.parse(localLists);
//       setLists(localListsParsed);
//     } else {
//       console.log("No it's here");
//       setLists({ ...lists, lists: initialData.tas });
//       syncToLocal();
//     }
//   };
//   const syncToLocal = () => {
//     localStorage.setItem("lists", JSON.stringify(defaultLists));
//   };
