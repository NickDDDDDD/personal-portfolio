//  const shuffle = useCallback(() => {
//     console.log("Shuffling");
//     setIconObjs((prevIcons) => {
//       const positions = [];
//       const updatedIcons = prevIcons.map((icon) => {
//         let bestPosition = null;
//         let smallestDistance = Infinity;

//         for (let i = 0; i < 100; i++) {
//           const { top, left } = generateRandomPosition(
//             positions,
//             baseSize,
//             minDistance,
//           );

//           const distance = Math.sqrt(
//             Math.pow(parseFloat(icon.top) - top, 2) +
//               Math.pow(parseFloat(icon.left) - left, 2),
//           );

//           if (distance > 0 && distance < smallestDistance) {
//             bestPosition = { top, left };
//             smallestDistance = distance;
//           }
//         }

//         if (bestPosition) {
//           positions.push(bestPosition);
//           return {
//             ...icon,
//             top: `${bestPosition.top}px`,
//             left: `${bestPosition.left}px`,
//             rotate: Math.random() * 60 - 30,
//           };
//         }

//         const fallbackPosition = generateRandomPosition(
//           positions,
//           baseSize,
//           minDistance,
//         );
//         positions.push(fallbackPosition);
//         return {
//           ...icon,
//           top: `${fallbackPosition.top}px`,
//           left: `${fallbackPosition.left}px`,
//           rotate: Math.random() * 60 - 30,
//         };
//       });

//       return updatedIcons;
//     });
//   }, [baseSize, minDistance, generateRandomPosition]);
