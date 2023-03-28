var Build = (function() {
    var FALLBACK_ICON = 'coui://ui/main/game/live_game/img/build_bar/img_missing_unit.png';
    var pathWithoutExtensionMatch = /(.*)\.json[^\/]*$/;

    var iconForSpecId = function(id)
    {
 var match = null;
 if (id)
     match = pathWithoutExtensionMatch.exec(id);

 if (_.size(match) < 2)
     return FALLBACK_ICON;

 return 'coui:/' + match[1] + '_icon_buildbar.png';
    };

    var iconForUnit = function (unit)
    {
 if (!unit)
     return FALLBACK_ICON;
 return iconForSpecId(unit.id);
    };

    var HotkeyModel = function()
    {
 var self = this;

 self.SpecIdToGridMap = ko.observable(
   _.cloneDeep(HotkeyModel.SpecIdToGridMap));
    };

    // historical build bar is 3 x 6 using indexes 0 to 17
    // new build bar is flexible using row / column

    HotkeyModel.SpecIdToGridMap =
    {	
	//Factory Tab
	"/pa/units/sea/naval_factory_adv/naval_factory_adv.json": ["factory", 7, {row: 2, column: 4}],
	"/pa/units/sea/naval_factory/naval_factory.json": ["factory", 13, {row: 3, column: 4}],
	"/pa/units/air/air_factory_adv/air_factory_adv.json": ["factory", 8, {row: 2, column: 5}],
	"/pa/units/air/air_factory/air_factory.json": ["factory", 14, {row: 3, column: 5}],
	"/pa/units/land/bot_factory_adv/bot_factory_adv.json": ["factory", 9, {row: 2, column: 6}],
	"/pa/units/land/bot_factory/bot_factory.json": ["factory", 15, {row: 3, column: 6}],
	"/pa/units/land/vehicle_factory_adv/vehicle_factory_adv.json": ["factory", 10, {row: 2, column: 7}],
	"/pa/units/land/vehicle_factory/vehicle_factory.json": ["factory", 16, {row: 3, column: 7}],
	"/pa/units/land/unit_cannon/unit_cannon.json": ["factory", 6, {row: 2, column: 8}],
	"/pa/units/orbital/orbital_launcher/orbital_launcher.json": ["factory", 12, {row: 3, column: 8}],
	"/pa/units/addon/adv_fab_tower/adv_fab_tower.json": ["factory", 0, { row: 2, column: 9 }],
	"/pa/units/addon/fab_tower/fab_tower.json": ["factory", 0, { row: 3, column: 9 }],
	
	"/pa/units/sea/l_naval_factory_adv/l_naval_factory_adv.json": ["L_factory", 7, { row: 2, column: 0, titans: true }],
	"/pa/units/sea/l_naval_factory/l_naval_factory.json": ["L_factory", 13, { row: 3, column: 0, titans: true }],
	"/pa/units/air/l_air_factory_adv/l_air_factory_adv.json": ["L_factory", 8, { row: 2, column: 1, titans: true }],
	"/pa/units/air/l_air_factory/l_air_factory.json": ["L_factory", 14, { row: 3, column: 1, titans: true }],
	"/pa/units/land/l_bot_factory_adv/l_bot_factory_adv.json": ["L_factory", 9, { row: 2, column: 2, titans: true }],
	"/pa/units/land/l_bot_factory/l_bot_factory.json": ["L_factory", 15, { row: 3, column: 2, titans: true }],
	"/pa/units/land/l_vehicle_factory_adv/l_vehicle_factory_adv.json": ["L_factory", 10, { row: 2, column: 3, titans: true }],
	"/pa/units/land/l_vehicle_factory/l_vehicle_factory.json": ["L_factory", 16, { row: 3, column: 3, titans: true }],
	"/pa/units/land/l_unit_cannon/l_unit_cannon.json": ["L_factory", 6, { row: 1, column: 0, titans: true }],
	"/pa/units/air/l_flying_teleporter/l_flying_teleporter.json": ["L_factory", 0, {row: 2, column: 4, titans: true }],
	"/pa/units/orbital/l_orbital_launcher/l_orbital_launcher.json": ["L_factory", 12, { row: 3, column: 4, titans: true }],
    "/pa/units/l_addon/adv_fab_turret/adv_fab_turret.json": ["L_factory", 0, { row: 2, column: 5, titans: true }],
	"/pa/units/l_addon/fab_turret/fab_turret.json": ["L_factory", 0, { row: 3, column: 5, titans: true }],
	
	//Titans
	"/pa/units/paeiou/poseidon/poseidon.json": ["factory", 0,{ row: 1, column: 4, titans: true }],
	"/pa/units/air/titan_air/titan_air.json": ["factory", 1, {row: 1, column: 5}],
	"/pa/units/land/titan_bot/titan_bot.json": ["factory", 3, {row: 0, column: 6}],
	"/pa/units/addon/demi_titan_bot/demi_titan_bot.json": ["factory", 1, { row: 1, column: 6 }],
	"/pa/units/land/titan_vehicle/titan_vehicle.json": ["factory", 5, {row: 1, column: 7}],
	
	"/pa/units/air/l_titan_air/l_titan_air.json": ["L_factory", 0, { row: 1, column: 1, titans: true }],
	"/pa/units/land/l_titan_bot/l_titan_bot.json": ["L_factory", 2, { row: 0, column: 2, titans: true }],
	"/pa/units/l_addon/l_demi_titan_bot/l_demi_titan_bot.json": ["L_factory", 0, { row: 1, column: 2 }],
	"/pa/units/land/l_titan_vehicle/l_titan_vehicle.json": ["L_factory", 4, { row: 1, column: 3, titans: true }],
	
	//Combat Tab
	"/pa/units/addon/pounder/pounder.json": ["combat", 0, { row: 1, column: 5 }],
    "/pa/units/addon/anti_missile_tower/anti_missile_tower.json": ["combat", 0, { row: 1, column: 1 }],
    "/pa/units/addon/basic_missile_defence/basic_missile_defence.json": ["combat", 0, { row: 3, column: 2 }],
	"/pa/units/land/laser_defense_adv/laser_defense_adv.json": ["combat", 0, {row: 1, column: 0}],
	"/pa/units/land/artillery_long/artillery_long.json": ["combat", 2, {row: 2, column: 4}],
	"/pa/units/land/tactical_missile_launcher/tactical_missile_launcher.json": ["combat", 3, {row: 0, column: 2}],
	"/pa/units/land/nuke_launcher/nuke_launcher.json": ["combat", 4, {row: 0, column: 4}],
	"/pa/units/land/laser_defense/laser_defense.json": ["combat", 6, {row: 2, column: 0}],
	"/pa/units/land/air_defense_adv/air_defense_adv.json": ["combat", 7, {row: 2, column: 1}],
	"/pa/units/land/artillery_unit_launcher/artillery_unit_launcher.json": ["combat", 8, {row: 0, column: 1}],
	"/pa/units/sea/torpedo_launcher_adv/torpedo_launcher_adv.json": ["combat", 9, {row: 1, column: 2}],
	"/pa/units/land/anti_nuke_launcher/anti_nuke_launcher.json": ["combat", 10, {row: 1, column: 4}],
	"/pa/units/land/laser_defense_single/laser_defense_single.json": ["combat", 12, {row: 3, column: 0}],
	"/pa/units/land/air_defense/air_defense.json": ["combat", 13, {row: 3, column: 1}],
	"/pa/units/land/artillery_short/artillery_short.json": ["combat", 14, {row: 3, column: 5}],
	"/pa/units/sea/torpedo_launcher/torpedo_launcher.json": ["combat", 15, {row: 2, column: 2}],
	"/pa/units/orbital/ion_defense/ion_defense.json": ["combat", 16, {row: 3, column: 3}],
	"/pa/units/land/artillery_comet/artillery_comet.json": ["combat", 0, { row: 1, column: 3, titans: true }],
    "/pa/units/land/artillery_morningstar/artillery_morningstar.json": ["combat", 0, { row: 0, column: 3, titans: true }],
	"/pa/units/land/maciota/maciota.json": ["combat", 0, { row: 2, column: 3 }],
    "/pa/units/land/canhao/canhao.json": ["combat", 0, { row: 2, column: 5 }],
    "/pa/units/land/kinha/kinha.json": ["combat", 0, { row: 0, column: 5 }],
    "/pa/units/land/hovertruck/hovertruck.json": ["combat", 0, { row: 3, column: 4 }],
	"/pa/units/addon/tree_hardpoint_base/tree_hardpoint_base.json": ["combat", 0, { row: 0, column: 0 }],
	
    "/pa/units/addon/tree_hardpoint_base_legion/tree_hardpoint_base_legion.json": ["L_combat", 0, { row: 0, column: 0 }],
	"/pa/units/land/l_flame_turret/l_flame_turret.json": ["L_combat", 3, { row: 1, column: 0, titans: true }],
	"/pa/units/land/l_artillery_long/l_artillery_long.json": ["L_combat", 2, { row: 1, column: 3, titans: true }],
	"/pa/units/land/l_rocket_barrage/l_rocket_barrage.json": ["L_combat", 0, { row: 0, column: 1, titans: true }],
	"/pa/units/land/l_nuke_launcher/l_nuke_launcher.json": ["L_combat", 4, { row: 0, column: 3, titans: true }],
	"/pa/units/land/l_t1_turret_adv/l_t1_turret_adv.json": ["L_combat", 6, { row: 2, column: 0, titans: true }],
	"/pa/units/land/l_air_defense_adv/l_air_defense_adv.json": ["L_combat", 7, { row: 2, column: 2, titans: true }],
	"/pa/units/land/l_swarm_hive/l_swarm_hive.json": ["L_combat", 8, { row: 1, column: 2, titans: true }],
	"/pa/units/sea/l_torpedo_launcher_adv/l_torpedo_launcher_adv.json": ["L_combat", 9, { row: 1, column: 1, titans: true }],
	"/pa/units/land/l_anti_nuke_launcher/l_anti_nuke_launcher.json": ["L_combat", 10, { row: 0, column: 2, titans: true }],
	"/pa/units/land/l_t1_turret_basic/l_t1_turret_basic.json": ["L_combat", 12, { row: 3, column: 0, titans: true }],
	"/pa/units/land/l_air_defense/l_air_defense.json": ["L_combat", 13, { row: 3, column: 2, titans: true }],
	"/pa/units/land/l_artillery_short/l_artillery_short.json": ["L_combat", 14, { row: 2, column: 3, titans: true }],
	"/pa/units/sea/l_torpedo_launcher/l_torpedo_launcher.json": ["L_combat", 15, { row: 2, column: 1, titans: true }],
	"/pa/units/orbital/l_ion_defense/l_ion_defense.json": ["L_combat", 16, { row: 3, column: 3, titans: true }],
	"/pa/units/l_addon/basic_missile_defence/basic_missile_defence.json": ["L_combat", 0, { row: 3, column: 1 }],
	
		
	//Utility Tab
	"/pa/units/land/titan_structure/titan_structure.json": ["utility", 0, {row: 0, column: 0}],
	"/pa/units/land/control_module/control_module.json": ["utility", 1, {row: 1, column: 0}],
	"/pa/units/orbital/delta_v_engine/delta_v_engine.json": ["utility", 7, {row: 2, column: 0}],
	"/pa/units/land/teleporter/teleporter.json": ["utility", 13, {row: 3, column: 0}],
	"/pa/units/land/energy_plant_adv/energy_plant_adv.json": ["utility", 3, {row: 1, column: 4}],
	"/pa/units/land/metal_extractor_adv/metal_extractor_adv.json": ["utility", 4, {row: 2, column: 5}],
	"/pa/units/land/radar_adv/radar_adv.json": ["utility", 8, {row: 2, column: 1}],
	"/pa/units/land/energy_plant/energy_plant.json": ["utility", 9, {row: 3, column: 4}],
	"/pa/units/land/metal_extractor/metal_extractor.json": ["utility", 10, {row: 3, column: 5}],
	"/pa/units/land/land_barrier/land_barrier.json": ["utility", 12, {row: 3, column: 2}],
	"/pa/units/land/radar/radar.json": ["utility", 14, {row: 3, column: 1}],
	"/pa/units/land/energy_storage/energy_storage.json": ["utility", 15, {row: 3, column: 3}],
	"/pa/units/land/metal_storage/metal_storage.json": ["utility", 16, {row: 2, column: 3}],
	"/pa/units/addon/metal_generator/metal_generator.json": ["utility", 0, { row: 2, column: 4 }],
    "/pa/units/addon/adv_metal_generator/adv_metal_generator.json": ["utility", 0, { row: 0, column: 4 }],
    "/pa/units/addon/adv_energy_storage/adv_energy_storage.json": ["utility", 0, { row: 1, column: 3 }],
    "/pa/units/addon/jammer_titan/jammer_titan.json": ["utility", 0, { row: 0, column: 2 }],
    "/pa/units/addon/system_radar/system_radar.json": ["utility", 0, { row: 1, column: 1 }],
    "/pa/units/addon/adv_metal_storage/adv_metal_storage.json": ["utility", 0, { row: 0, column: 3 }],
    "/pa/units/addon/jammer/jammer.json": ["utility", 0, { row: 1, column: 2 }],
	"/pa/units/paeiou/dox_materializer/dox_materializer.json": ["utility", 0,{ row: 2, column: 2, titans: true }],
	"/pa/units/land/radar_titan/radar_titan.json": ["utility", 0, { row: 0, column: 1 }],
	"/pa/units/land/metal_destructor/metal_destructor.json": ["utility", 0, { row: 1, column: 5 }],

	"/pa/units/land/l_titan_structure/l_titan_structure.json": ["L_utility", 0, { row: 0, column: 0, titans: true }],
	"/pa/units/land/l_control_module/l_control_module.json": ["L_utility", 1, { row: 1, column: 0, titans: true }],
	"/pa/units/orbital/l_delta_v_engine/l_delta_v_engine.json": ["L_utility", 7, { row: 2, column: 0, titans: true }],
	"/pa/units/land/l_teleporter/l_teleporter.json": ["L_utility", 13, { row: 3, column: 0, titans: true }],
	"/pa/units/l_addon/l_jammer_station/l_jammer_station.json": ["L_utility", 0, { row: 0, column: 1 }],
	"/pa/units/l_addon/system_radar/system_radar.json": ["L_utility", 0, { row: 1, column: 1 }],
	"/pa/units/land/l_radar_adv/l_radar_adv.json": ["L_utility", 8, { row: 2, column: 1, titans: true }],
	"/pa/units/land/l_radar/l_radar.json": ["L_utility", 14, { row: 3, column: 1, titans: true }],
	"/pa/units/land/l_shield_gen/l_shield_gen.json": ["L_utility", 1, { row: 1, column: 2, titans: true }],
	"/pa/units/land/l_land_barrier/l_land_barrier.json": ["L_utility", 12, { row: 2, column: 2, titans: true }],
	"/pa/units/land/l_storage/l_storage.json": ["L_utility", 15, { row: 3, column: 2, titans: true }],
	"/pa/units/land/l_energy_plant_adv/l_energy_plant_adv.json": ["L_utility", 3, { row: 1, column: 3, titans: true }],
	"/pa/units/land/l_energy_plant/l_energy_plant.json": ["L_utility", 9, { row: 3, column: 3, titans: true }],
	"/pa/units/land/l_mex_adv/l_mex_adv.json": ["L_utility", 4, { row: 2, column: 4, titans: true }],
	"/pa/units/land/l_mex/l_mex.json": ["L_utility", 10, { row: 3, column: 4, titans: true }],
	"/pa/units/l_addon/mass_generator/mass_generator.json": ["L_utility", 0, { row: 2, column: 3, titans: true }],
    "/pa/units/l_addon/adv_mass_generator/adv_mass_generator.json": ["L_utility", 0, { row: 0, column: 3, titans: true }],
    
	//Facilities	
	//Naval
	"/pa/units/sea/fabrication_ship_adv/fabrication_ship_adv.json": ["sea", 6, {row: 1, column: 0}],
	"/pa/units/addon/fabrication_sub/fabrication_sub.json": ["sea", 0, { row: 2, column: 0 }],
	"/pa/units/sea/fabrication_ship/fabrication_ship.json": ["sea", 12, {row: 3, column: 0}],
	"/pa/units/sea/drone_carrier/carrier/carrier.json": ["sea", 0, {row: 1, column: 1}],
	"/pa/units/sea/bolide/bolide.json": ["sea", 0, { row: 2, column: 1, titans: true }],
	"/pa/units/sea/fabrication_barge/fabrication_barge.json": ["sea", 17, {row: 3, column: 1}],
	"/pa/units/sea/missile_ship/missile_ship.json": ["sea", 8, {row: 1, column: 2}],
	"/pa/units/sea/battleship/battleship.json": ["sea", 7, {row: 2, column: 2}],
	"/pa/units/sea/frigate/frigate.json": ["sea", 13, {row: 3, column: 2}],
	"/pa/units/sea/hover_ship/hover_ship.json": ["sea", 10, {row: 2, column: 3}],
	"/pa/units/sea/destroyer/destroyer.json": ["sea", 14, {row: 3, column: 3}],
	"/pa/units/sea/nuclear_sub/nuclear_sub.json": ["sea", 9, {row: 2, column: 4}],
	"/pa/units/sea/attack_sub/attack_sub.json": ["sea", 15, {row: 3, column: 4}],
	"/pa/units/addon/naval_anti_orbital_ship/naval_anti_orbital.json": ["sea", 0, { row: 1, column: 5 }],
	"/pa/units/paeiou/dolfin/dolfin.json": ["sea", 0,{ row: 2, column: 5, titans: true }],
	"/pa/units/sea/sea_scout/sea_scout.json": ["sea", 16, {row: 3, column: 5}],
	
	"/pa/units/sea/l_hover_ship/l_hover_ship.json": ["L_sea", 0, { row: 1, column: 0, titans: true }],
	"/pa/units/sea/l_fabrication_ship_adv/l_fabrication_ship_adv.json": ["L_sea", 6, { row: 2, column: 0, titans: true }],
	"/pa/units/sea/l_sea_tank/l_sea_tank.json": ["L_sea", 7, { row: 2, column: 1, titans: true }],
	"/pa/units/sea/l_battleship/l_battleship.json": ["L_sea", 8, { row: 2, column: 2, titans: true }],
	"/pa/units/sea/l_missile_ship/l_missile_ship.json": ["L_sea", 9, { row: 2, column: 3, titans: true }],
	"/pa/units/sea/l_fabrication_sub_combat_adv/l_fabrication_sub_combat_adv.json": ["L_sea", 10, { row: 2, column: 4, titans: true }],
	"/pa/units/sea/l_fabrication_ship/l_fabrication_ship.json": ["L_sea", 12, { row: 3, column: 0, titans: true }],
	"/pa/units/sea/l_sea_scout/l_sea_scout.json": ["L_sea", 13, { row: 3, column: 1, titans: true }],
	"/pa/units/sea/l_destroyer/l_destroyer.json": ["L_sea", 14, { row: 3, column: 2, titans: true }],
	"/pa/units/sea/l_attack_sub/l_attack_sub.json": ["L_sea", 15, { row: 3, column: 3, titans: true }],
	"/pa/units/sea/l_frigate/l_frigate.json": ["L_sea", 16, { row: 3, column: 4, titans: true }],
	"/pa/units/l_addon/anti_orbital_ship/anti_orbital_ship.json": ["L_sea", 0, { row: 2, column: 5 }],
	
	//Air
	"/pa/units/air/support_platform/support_platform.json": ["air", 0, {row: 1, column: 0}],
	"/pa/units/air/fabrication_aircraft_adv/fabrication_aircraft_adv.json": ["air", 6, {row: 2, column: 0}],
	"/pa/units/air/fabrication_aircraft/fabrication_aircraft.json": ["air", 12, {row: 3, column: 0}],
	"/pa/units/air/fighter_adv/fighter_adv.json": ["air", 7, {row: 0, column: 1}],
	"/pa/units/air/strafer/strafer.json": ["air", 10, {row: 1, column: 1}],
	"/pa/units/addon/swordfish/swordfish.json": ["air", 0, { row: 2, column: 1 }],
	"/pa/units/air/fighter/fighter.json": ["air", 13, {row: 3, column: 1}],
	"/pa/units/air/bomber_heavy/bomber_heavy.json": ["air", 10, {row: 0, column: 2}],
	"/pa/units/air/bomber_adv/bomber_adv.json": ["air", 9, {row: 1, column: 2}],
	"/pa/units/paeiou/yellowjacket/yellowjacket.json": ["air", 0,{ row: 2, column: 2, titans: true }],
	"/pa/units/air/bomber/bomber.json": ["air", 14, {row: 3, column: 2}],
	"/pa/units/air/binho/binho.json": ["air", 0, { row: 0, column: 3 }],
	"/pa/units/air/gunship/gunship.json": ["air", 8, {row: 1, column: 3}],
	"/pa/units/air/solar_drone/solar_drone.json": ["air", 17, {row: 2, column: 3}],
	"/pa/units/air/air_scout/air_scout.json": ["air", 15, {row: 3, column: 3}],
	"/pa/units/air/thorondor/thorondor.json": ["air", 0, { row: 2, column: 4 }],
	"/pa/units/air/transport/transport.json": ["air", 16, {row: 3, column: 4}],
	
	"/pa/units/air/l_fabrication_aircraft_adv/l_fabrication_aircraft_adv.json": ["L_air", 6, { row: 2, column: 0, titans: true }],
	"/pa/units/air/l_fighter_adv/l_fighter_adv.json": ["L_air", 7, { row: 2, column: 1, titans: true }],
	"/pa/units/air/l_gunship/l_gunship.json": ["L_air", 8, { row: 2, column: 2, titans: true }],
	"/pa/units/air/l_air_carrier/l_air_carrier.json": ["L_air", 9, { row: 2, column: 3, titans: true }],
	"/pa/units/air/l_fabrication_aircraft/l_fabrication_aircraft.json": ["L_air", 12, { row: 3, column: 0, titans: true }],
	"/pa/units/air/l_fighter/l_fighter.json": ["L_air", 13, { row: 3, column: 1, titans: true }],
	"/pa/units/air/l_bomber/l_bomber.json": ["L_air", 14, { row: 3, column: 2, titans: true }],
	"/pa/units/air/l_raider/l_raider.json": ["L_air", 15, { row: 3, column: 3, titans: true }],
	"/pa/units/air/l_transport/l_transport.json": ["L_air", 16, { row: 3, column: 4, titans: true }],
	"/pa/units/air/l_air_bomb/l_air_bomb.json": ["L_air", 17, { row: 3, column: 5, titans: true }],
	"/pa/units/air/l_firestarter/l_firestarter.json": ["L_air", 10, { row: 2, column: 4, titans: true }],
	"/pa/units/air/l_air_scout_adv/l_air_scout_adv.json": ["L_air", 11, { row: 2, column: 5, titans: true }],
	"/pa/units/air/l_air_scout_adv/l_vision/l_vision.json": ["L_air", 0, { row: 1, column: 0, titans: true }],

	//Vehicle
	"/pa/units/land/tank_nuke/tank_nuke.json": ["vehicle", 0, {row: 1, column: 0}],
	"/pa/units/land/fabrication_vehicle_adv/fabrication_vehicle_adv.json": ["vehicle", 6, {row: 2, column: 0}],
	"/pa/units/land/fabrication_vehicle/fabrication_vehicle.json": ["vehicle", 12, {row: 3, column: 0}],
	"/pa/units/land/tank_light_laser/tank_light_laser.json": ["vehicle", 13, {row: 3, column: 1}],
	"/pa/units/land/tank_laser_adv/tank_laser_adv.json": ["vehicle", 7, {row: 2, column: 1}],
	"/pa/units/land/tank_heavy_armor/tank_heavy_armor.json": ["vehicle", 8, {row: 2, column: 2}],
	"/pa/units/land/tank_heavy_mortar/tank_heavy_mortar.json": ["vehicle", 9, {row: 2, column: 3}],
	"/pa/units/land/tank_flak/tank_flak.json": ["vehicle", 10, {row: 2, column: 4}],
	"/pa/units/land/tank_armor/tank_armor.json": ["vehicle", 14, {row: 3, column: 2}],
	"/pa/units/land/land_scout/land_scout.json": ["vehicle", 15, {row: 3, column: 3}],
	"/pa/units/land/aa_missile_vehicle/aa_missile_vehicle.json": ["vehicle", 16, {row: 3, column: 4}],
	"/pa/units/land/tank_hover/tank_hover.json": ["vehicle", 17, {row: 3, column: 5}],
	"/pa/units/land/attack_vehicle/attack_vehicle.json": ["vehicle", 20, {row: 3, column: 6}],
	"/pa/units/addon/hover_fab/hover_fab.json": ["vehicle", 9, { row: 2, column: 8 }],
    "/pa/units/addon/stalker/stalker.json": ["vehicle", 9, { row: 2, column: 6 }],
    "/pa/units/addon/adv_tank_hover/adv_tank_hover.json": ["vehicle", 9, { row: 2, column: 5 }],
	"/pa/units/land/tank_shield/tank_shield.json": ["vehicle", 0, { row: 1, column: 2 }],
    "/pa/units/land/bumba/bumba.json": ["vehicle", 0, { row: 1, column: 4 }],
    "/pa/units/land/prex/prex.json": ["vehicle", 0, { row: 1, column: 1 }],
	"/pa/units/land/tank_heavy_meteor/tank_heavy_meteor.json": ["vehicle", 0, { row: 1, column: 7, titans: true }],	
	"/pa/units/land/tank_drone/tank_drone/tank_drone.json": ["vehicle", 0, { row: 1, column: 3 }],
    "/pa/units/land/tank_decoy/tank_decoy.json": ["vehicle", 0, { row: 2, column: 7 }],
    "/pa/units/land/tank_decoy_little/tank_decoy_little.json": ["vehicle", 0, { row: 3, column: 7 }],
	
	"/pa/units/land/l_fabrication_vehicle_adv/l_fabrication_vehicle_adv.json": ["L_vehicle", 6, { row: 2, column: 0, titans: true }],
	"/pa/units/land/l_tank_laser_adv/l_tank_laser_adv.json": ["L_vehicle", 7, { row: 2, column: 1, titans: true }],
	"/pa/units/land/l_tank_heavy_armor/l_tank_heavy_armor.json": ["L_vehicle", 8, { row: 2, column: 2, titans: true }],
	"/pa/units/land/l_sniper_tank/l_sniper_tank.json": ["L_vehicle", 9, { row: 2, column: 3, titans: true }],
	"/pa/units/land/l_hover_tank_adv/l_hover_tank_adv.json": ["L_vehicle", 10, { row: 2, column: 4, titans: true }],
	"/pa/units/land/l_tank_swarm/l_tank_swarm.json": ["L_vehicle", 11, { row: 2, column: 5, titans: true }],
	"/pa/units/land/l_fabrication_vehicle/l_fabrication_vehicle.json": ["L_vehicle", 12, { row: 3, column: 0, titans: true }],
	"/pa/units/land/l_tank_shank/l_tank_shank.json": ["L_vehicle", 13, { row: 3, column: 1, titans: true }],
	"/pa/units/land/l_shotgun_tank/l_shotgun_tank.json": ["L_vehicle", 14, { row: 3, column: 2, titans: true }],
	"/pa/units/land/l_mortar_tank/l_mortar_tank.json": ["L_vehicle", 15, { row: 3, column: 3, titans: true }],
	"/pa/units/land/l_hover_tank/l_hover_tank.json": ["L_vehicle", 16, { row: 3, column: 4, titans: true }],
	"/pa/units/land/l_fabrication_vehicle_combat/l_fabrication_vehicle_combat.json": ["L_vehicle", 17, { row: 3, column: 5, titans: true }],
	 "/pa/units/l_addon/anti_orbital_armor/lynx.json": ["L_vehicle", 0, { row: 2, column: 6, titans: true }],
	
	//Bot
	"/pa/units/land/bot_prototype_support_commander/bot_prototype_support_commander.json": ["bot", 0,{ row: 0, column: 0, titans: true }],
	"/pa/units/land/bot_support_commander/bot_support_commander.json": ["bot", 0, {row: 1, column: 0}],
	"/pa/units/land/fabrication_bot_adv/fabrication_bot_adv.json": ["bot", 6, {row: 2, column: 0}],
	"/pa/units/land/fabrication_bot/fabrication_bot.json": ["bot", 12, {row: 3, column: 0}],
	"/pa/units/land/assault_bot_adv/assault_bot_adv.json": ["bot", 7, {row: 2, column: 1}],
	"/pa/units/land/bot_sniper/bot_sniper.json": ["bot", 8, {row: 2, column: 2}],
	"/pa/units/land/fabrication_bot_combat_adv/fabrication_bot_combat_adv.json": ["bot", 9, {row: 2, column: 3}],
	"/pa/units/land/bot_tactical_missile/bot_tactical_missile.json": ["bot", 10, {row: 2, column: 4}],
	"/pa/units/land/bot_nanoswarm/bot_nanoswarm.json": ["bot", 11, {row: 1, column: 5}],
	"/pa/units/land/assault_bot/assault_bot.json": ["bot", 13, {row: 3, column: 1}],
	"/pa/units/land/bot_grenadier/bot_grenadier.json": ["bot", 14, {row: 3, column: 2}],
	"/pa/units/land/fabrication_bot_combat/fabrication_bot_combat.json": ["bot", 15, {row: 3, column: 3}],
	"/pa/units/land/bot_bomb/bot_bomb.json": ["bot", 16, {row: 3, column: 4}],
	"/pa/units/land/bot_tesla/bot_tesla.json": ["bot", 17, {row: 3, column: 5}],
	"/pa/units/land/bot_aa/bot_aa.json": ["bot", 18, {row: 3, column: 6}],
    "/pa/units/addon/rex/rex.json": ["bot", 0, { row: 3, column: 7 }],
    "/pa/units/addon/adv_heavy_bot/adv_heavy_bot.json": ["bot", 0, { row: 1, column: 1 }],
	"/pa/units/land/bot_drone/bot_drone.json": ["bot", 0, { row: 1, column: 6 }],
    "/pa/units/land/bot_tp/bot_tp.json": ["bot", 0, { row: 2, column: 5 }],
    "/pa/units/land/bot_tree/bot_tree.json": ["bot", 0, { row: 0, column: 5 }],
    "/pa/units/land/bot_sniper_big/bot_sniper_big.json": ["bot", 0, { row: 1, column: 2 }],
    "/pa/units/land/halabib/halabib.json": ["bot", 0, { row: 0, column: 6 }],
    "/pa/units/land/cuzeta/cuzeta.json": ["bot", 0, { row: 0, column: 1 }],
    "/pa/units/land/tank_shield_2/tank_shield_2.json": ["bot", 0, { row: 1, column: 3 }],
	"/pa/units/land/bot_sun/bot_sun.json": ["bot", 0, { row: 2, column: 7, titans: true }],
	"/pa/units/paeiou/spider/spider.json": ["bot", 0,{ row: 2, column: 6, titans: true }],
	
	"/pa/units/land/l_bot_prototype_support_commander/l_bot_prototype_support_commander.json": ["L_bot", 0,{ row: 0, column: 0, titans: true }],
	"/pa/units/land/l_bot_support_commander/l_bot_support_commander.json": ["L_bot", 0, { row: 1, column: 0, titans: true }],
	"/pa/units/land/l_fabrication_bot_adv/l_fabrication_bot_adv.json": ["L_bot", 6, { row: 2, column: 0, titans: true }],
	"/pa/units/land/l_fabrication_bot/l_fabrication_bot.json": ["L_bot", 12, { row: 3, column: 0, titans: true }],
	"/pa/units/land/l_riot_bot/l_riot_bot.json": ["L_bot", 7, { row: 2, column: 1, titans: true }],
	"/pa/units/land/l_bot_artillery_adv/l_bot_artillery_adv.json": ["L_bot", 8, { row: 2, column: 2, titans: true }],
	"/pa/units/land/l_bot_aa_adv/l_bot_aa_adv.json": ["L_bot",9, { row: 2, column: 3, titans: true }],
	"/pa/units/land/l_bot_artillery/l_bot_artillery.json": ["L_bot", 10, { row: 2, column: 4, titans: true }],
	"/pa/units/land/l_necromancer/l_necromancer.json": ["L_bot", 11, { row: 2, column: 5, titans: true }],
	"/pa/units/land/l_assault_bot/l_assault_bot.json": ["L_bot", 13, { row: 3, column: 1, titans: true }],
	"/pa/units/land/l_sniper_bot/l_sniper_bot.json": ["L_bot", 14, { row: 3, column: 2, titans: true }],
	"/pa/units/land/l_bot_aa/l_bot_aa.json": ["L_bot", 15, { row: 3, column: 3, titans: true }],
	"/pa/units/land/l_bot_bomb/l_bot_bomb.json": ["L_bot", 16, { row: 3, column: 4, titans: true }],
	"/pa/units/land/l_scout_bot/l_scout_bot.json": ["L_bot", 17, { row: 3, column: 5, titans: true }],
	
	//Oribital & Orbital Tab
	"/pa/units/orbital/titan_orbital/titan_orbital.json": ["orbital_structure", 0, {row: 2, column: 1}],
	"/pa/units/orbital/defense_satellite/defense_satellite.json": ["orbital_structure", 12, {row: 3, column: 0}],
	"/pa/units/orbital/mining_platform/mining_platform.json": ["orbital_structure", 13, {row: 3, column: 1}],
	"/pa/units/orbital/orbital_factory/orbital_factory.json": ["orbital_structure", 14, {row: 3, column: 2}],
	"/pa/units/addon/orbital_anti_nuke/orbital_anti_nuke.json": ["orbital_structure", 6, { row: 2, column: 0 }],
	"/pa/units/paeiou/sigma/sigma.json": ["orbital_structure", 0,{ row: 1, column: 1, titans: true }],
	"/pa/units/orbital/orbital_fabrication_bot_adv/orbital_fabrication_bot_adv.json": ["orbital", 0, { row: 2, column: 0 }],
	"/pa/units/orbital/orbital_fabrication_bot/orbital_fabrication_bot.json": 		  ["orbital", 12, {row: 3, column: 0}],
	"/pa/units/orbital/orbital_battleship/orbital_battleship.json": ["orbital", 0, {row: 1, column: 1}],
	"/pa/units/orbital/solar_array/solar_array.json": ["orbital", 6, {row: 1, column: 0}],
	"/pa/units/orbital/radar_satellite_adv/radar_satellite_adv.json": ["orbital", 8, {row: 2, column: 2}],
	"/pa/units/orbital/orbital_railgun/orbital_railgun.json": ["orbital", 9, {row: 2, column: 1}],
	"/pa/units/orbital/orbital_fighter/orbital_fighter.json": ["orbital", 13, {row: 3, column: 1}],
	"/pa/units/orbital/radar_satellite/radar_satellite.json": ["orbital", 14, {row: 3, column: 2}],
	"/pa/units/orbital/orbital_probe/orbital_probe.json": ["orbital", 16, {row: 2, column: 3}],
	"/pa/units/orbital/orbital_lander/orbital_lander.json": ["orbital", 15, {row: 3, column: 3}],
	"/pa/units/orbital/orbital_armageddon/orbital_armageddon.json":  ["orbital", 0, { row: 1, column: 4, titans: true }],
	"/pa/units/orbital/orbital_laser/orbital_laser.json": 	["orbital", 7, {row: 2, column: 4}],
	"/pa/units/addon/andreas/andreas.json": ["orbital", 0, { row: 3, column: 4 }],
	
	"/pa/units/orbital/l_defense_satellite/l_defense_satellite.json": ["L_orbital_structure", 12, { row: 3, column: 0, titans: true }],
	"/pa/units/orbital/l_titan_orbital/l_titan_orbital.json": ["L_orbital_structure", 1, { row: 2, column: 0, titans: true }],
	"/pa/units/orbital/l_orbital_dropper/l_orbital_dropper.json": ["L_orbital_structure", 16, { row: 3, column: 3, titans: true }],
	"/pa/units/orbital/l_mining_platform/l_mining_platform.json": ["L_orbital_structure", 13, { row: 3, column: 1, titans: true }],
	"/pa/units/orbital/l_orbital_factory/l_orbital_factory.json": ["L_orbital_structure", 14, { row: 3, column: 2, titans: true }],
	"/pa/units/l_addon/l_orbital_jammer/l_orbital_jammer.json": ["L_orbital_structure", 0, { row: 2, column: 1 }],
    "/pa/units/l_addon/l_orbital_power/l_orbital_power.json": ["L_orbital_structure", 0, { row: 2, column: 2 }],
    "/pa/units/l_addon/orbital_anti_nuke/orbital_anti_nuke.json": ["L_orbital_structure", 6, { row: 2, column: 3 }],
	"/pa/units/orbital/l_orbital_fabrication_bot_adv/l_orbital_fabrication_bot_adv.json": ["L_orbital", 0, { row: 2, column: 0 }],
	"/pa/units/orbital/l_orbital_fabrication_bot/l_orbital_fabrication_bot.json": 		  ["L_orbital", 12, { row: 3, column: 0, titans: true }],
	"/pa/units/orbital/l_orbital_battleship/l_orbital_battleship.json": ["L_orbital", 6, { row: 1, column: 1, titans: true }],
	"/pa/units/orbital/l_radar_satellite_adv/l_radar_satellite_adv.json": ["L_orbital", 8, { row: 2, column: 2, titans: true }],
	"/pa/units/orbital/l_orbital_railgun/l_orbital_railgun.json": ["L_orbital", 9, { row: 2, column: 1, titans: true }],
	"/pa/units/orbital/l_orbital_fighter/l_orbital_fighter.json": ["L_orbital", 13, { row: 3, column: 1, titans: true }],
	"/pa/units/orbital/l_orbital_probe/l_orbital_probe.json": ["L_orbital", 16, { row: 2, column: 3, titans: true }],
	"/pa/units/orbital/l_orbital_lander/l_orbital_lander.json": ["L_orbital", 15, { row: 3, column: 3, titans: true }],
	"/pa/units/orbital/l_radar_satellite/l_radar_satellite.json": ["L_orbital", 14, { row: 3, column: 2, titans: true }],
	"/pa/units/orbital/l_orbital_laser/l_orbital_laser.json": ["L_orbital", 7, { row: 2, column: 4, titans: true }],
	"/pa/units/l_addon/anti_ground_satellite/almaz.json": ["L_orbital", 0, { row: 3, column: 4 }],
	
	
	//Other
	"/pa/units/land/land_mine/land_mine.json": ["ammo", 14, {row: 3, column: 2}],
	"/pa/units/land/anti_nuke_launcher/anti_nuke_launcher_ammo.json": ["ammo", 15, {row: 3, column: 3}],
	"/pa/units/land/nuke_launcher/nuke_launcher_ammo.json": ["ammo", 16, {row: 3, column: 4}],
	
	"/pa/units/land/l_land_mine/l_land_mine.json": ["L_ammo", 10, { row: 3, column: 4, titans: true }],
	"/pa/units/sea/l_sea_mine/l_sea_mine.json": ["L_ammo", 12, { row: 3, column: 0, titans: true }],
	"/pa/units/land/l_anti_nuke_launcher/l_anti_nuke_launcher_ammo.json": ["L_ammo", 13, { row: 3, column: 1, titans: true }],
	"/pa/units/land/l_nuke_launcher/l_nuke_launcher_ammo.json": ["L_ammo", 14, { row: 3, column: 2, titans: true }],
	
	//Thorosmen
	"/pa/units/land/bot_white_hole/bot_white_hole.json": ["Semititan", 0,{ row: 0, column: 0, titans: true }],
    "/pa/units/land/crusher/crusher.json": ["Semititan", 0,{ row: 0, column: 1, titans: true }],
    "/pa/units/land/ilegal/ilegal.json": ["Semititan", 0,{ row: 0, column: 2, titans: true }],
    "/pa/units/land/ggspider_build/ggspider_build.json": ["Semititan", 0,{ row: 0, column: 3, titans: true }],
    "/pa/units/land/bot_anti_nuke/bot_anti_nuke.json": ["Semititan", 0,{ row: 1, column: 0, titans: true }],
    "/pa/units/air/airship/airship.json": ["Semititan", 0,{ row: 1, column: 1, titans: true }],
    "/pa/units/land/pap/pap.json": ["Semititan", 0,{ row: 1, column: 2, titans: true }],
    "/pa/units/land/fef/fef.json": ["Semititan", 0,{ row: 1, column: 3, titans: true }],
	
	//Upgradable Turrets
    "/pa/units/addon/tree_hardpoint_base_bug/tree_hardpoint_base_bug.json": ["gantry", 0, { row: 2, column: 0 }],
    "/pa/units/addon/tier_1_machine_gun_build/tier_1_machine_gun_build.json": ["tier 1", 0, { row: 2, column: 0 }],
    "/pa/units/addon/tier_1_cannon_build/tier_1_cannon_build.json": ["tier 1", 0, { row: 2, column: 1 }],
    "/pa/units/addon/tier_2_auto_cannon_build/tier_2_auto_cannon_build.json": ["cannon", 0, { row: 2, column: 0 }],
    "/pa/units/addon/tier_3_artillery_build/tier_3_artillery_build.json": ["tier 3 arty", 0, { row: 2, column: 0 }],
    "/pa/units/addon/tier_3_rail_cannon_build/tier_3_rail_cannon_build.json": ["cannon", 0, { row: 2, column: 1 }],
    // "/pa/units/addon/tier_1_rocket_build/tier_1_rocket_build.json": ["tier 1", 0, { row: 2, column: 2 }],
    "/pa/units/addon/tier_1_radar_build/tier_1_radar_build.json": ["tier 1", 0, { row: 2, column: 2 }],
    "/pa/units/addon/tier_2_radar_build/tier_2_radar_build.json": ["tier 2 radar", 0, { row: 2, column: 0 }],
    "/pa/units/addon/tier_2_machine_gun_build/tier_2_machine_gun_build.json": ["mg2", 0, { row: 2, column: 0 }],
    "/pa/units/addon/tier_2_gatling_build/tier_2_gatling_build.json": ["mg4", 0, { row: 2, column: 1 }],
    "/pa/units/addon/tree_rocket_base_build/tree_rocket_base_build.json": ["basic", 0, { row: 2, column: 3 }],
    "/pa/units/addon/edison_build/edison_build.json": ["edison", 0, { row: 2, column: 0 }],
    "/pa/units/addon/tier_3_machine_gun_build/tier_3_machine_gun_build.json": ["mg4", 0, { row: 2, column: 2 }],
    // "/pa/units/addon/tier_3_beamer_build/tier_3_beamer_build.json": ["cannon", 0, { row: 2, column: 1 }],
	
	//SECTION 17
	"/pa/units/paeiou/experimental_gantry/experimental_gantry.json": ["gantry", 0,{ row: 0, column: 0, titans: true }],
	"/pa/units/paeiou/big_bill/big_bill.json": ["experimental", 0,{ row: 0, column: 2, titans: true }],
	"/pa/units/paeiou/pineapple/pineapple.json": ["experimental", 0,{ row: 0, column: 1, titans: true }],
	"/pa/units/paeiou/floater/floater.json": ["experimental", 0,{ row: 0, column: 0, titans: true }],
	"/pa/units/paeiou/horntail/horntail.json": ["experimental", 0,{ row: 1, column: 0, titans: true }],
	
	
	
	//BUGS MOD
	
	//"/pa/units/land/zap/bugzapper.json": ["bugs", 0, { row: 3, column: 0 }],
	
    };

    return {
 iconForSpecId: iconForSpecId,
 iconForUnit: iconForUnit,
 HotkeyModel: HotkeyModel,
    };
})();

//if (scene_mod_list['shared_build']) {
  //loadMods(scene_mod_list['shared_build'])}

// check for legacy indexes from mods

_.forEach( Build.HotkeyModel.SpecIdToGridMap, function(value, id)
{
    var size = value.length;
    var index = value[1];

    var row = Math.floor(index / 6);
    var column = column = index % 6

    if (size == 2)
    {
 var options =
 {
     row: row,
     column: column,
 }
 Build.HotkeyModel.SpecIdToGridMap[id].push(options);
 console.log('build.js old', index, row, column);
    }
})
