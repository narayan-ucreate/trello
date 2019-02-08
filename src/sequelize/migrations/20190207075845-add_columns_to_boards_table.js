'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
      queryInterface.addColumn(
        'Boards',
        'accessToken',
        {
          type: Sequelize.STRING,
          allowNull: true,
        }
      ),
      queryInterface.addColumn(
        'Boards',
        'accessTokenSecret',
        {
          type: Sequelize.STRING,
          allowNull: true,
        }
      ),
      queryInterface.addColumn(
        'Boards',
        'tokenMemberId',
        {
          type: Sequelize.STRING,
          allowNull: true,
        }
      )
    ];
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
   return [
    queryInterface.removeColumn('Boards', 'accessTokenSecret'),
    queryInterface.removeColumn('Boards', 'accessToken'),
    queryInterface.removeColumn('Boards', 'tokenMemberId'),
  ];

  }
};
