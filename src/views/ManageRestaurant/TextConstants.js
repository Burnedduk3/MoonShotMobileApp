export const getRestaurant = `
query{
  Business{
    getMyRestaurant(data:{username:"JuanPer"}){
      error
      message
      data{
        id
        restaurantIdentifier
        name
        address
        phoneNumber
        maxCapacity
        capacity
      }
    }
  }
}
`;

export const ViewText = {
  emptyPlaces: {
    title: 'Quedan',
    postfix: ' Puestos',
  },
  capacity: {
    title: 'Capacidad',
  },
};
