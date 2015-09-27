(function () {
    'use strict';

    function CharacterDetailsSkillsController($scope, $filter) {
        $scope.character = $scope.$parent.character;
        $scope.groupBySelector = ['skill_group', 'level'];
        $scope.groupBy = 0;
        $scope.nameFilter = '';
        $scope.filterSkills = function(skill) {
            if($scope.nameFilter.length == 0 || skill.typeName.toLowerCase().indexOf($scope.nameFilter.toLowerCase()) != -1) {
                return true;
            } else {
                return false
            }
        };

        $scope.collapse = function(closed) {
            if(closed) {
                angular.element("div.panel-collapse.in").removeClass("in");
            } else {
                angular.element("div.panel-collapse").addClass("in");
            }
        };

        $scope.heading = function(label) {
            if($scope.groupBy == 0) return label;
            else return "Level " + $filter("romanify")(label);
        };

        $scope.summarize = function(skills) {
            var skillPoints = 0;
            skills.forEach(function (skill) {
                skillPoints += skill.skillpoints;
            });

            return 'Points: ' + $filter('humanify')(skillPoints) + ' ['+skills.length+']';
        };
    }


    angular.
        module('characterDetailsSkillsControllers', []).
        controller('CharacterDetailsSkillsController', [
            '$scope',
            '$filter',
            CharacterDetailsSkillsController]);
}());