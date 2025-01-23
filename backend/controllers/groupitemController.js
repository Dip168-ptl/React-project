// import Item from '../models/Item.js';
// import Category from '../models/Category.js';


export const getItemsGroupedByCategory = async (req, res) => {
  try {
    const data = await TblItem.aggregate([
      {
        $lookup: {
          from: 'TblCategory',
          localField: 'CId', // Field in TblItem
          foreignField: '_id', // Field in TblCategory
          as: 'categoryInfo',
        },
      },
      {
        $unwind: '$categoryInfo',
      },
      {
        $group: {
          _id: '$categoryInfo.name', // Group by category name
          items: {
            $push: {
              id: '$_id',
              name: '$name',
              price: '$price',
              image: '$image',
              availability: '$availability',
            },
          },
        },
      },
      {
        $project: {
          category: '$_id',
          items: 1,
          _id: 0,
        },
      },
    ]);

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Error fetching items' });
  }
};

// module.exports = { getItemsGroupedByCategory };
