const M3 = 'Model 3 (incl. Highland)';
const MY = 'Model Y (incl. Juniper)';
const MS = 'Model S';
const MX = 'Model X';
const CT = 'Cybertruck';

function v(material, color, priceDelta, rating, desc) {
  return { material, color, label: `${material} · ${color}`, priceDelta, rating, desc };
}
const DEF_RATING = 4.6;

const BASE_PRODUCTS = [
  { baseId: 'p1', name: 'Panoramic roof sunshades', category: 'Sun Protection', models: [M3, MY, MS, CT], price: 89.00, desc: 'Custom-fit mesh sunshades to reduce heat and glare through the panoramic roof.', rating: 4.7,
    variants: [v('Mesh Fabric','Black',0,4.7,'Classic black mesh for maximum glare reduction.'), v('Mesh Fabric','Gray',0,4.6,'Light gray mesh that blends with lighter interiors.'), v('Reflective Mesh','Silver',10,4.8,'Enhanced reflective layer for extra heat rejection.')] },
  { baseId: 'p2', name: 'Panoramic roof / upper windshield sunshades', category: 'Sun Protection', models: [MX], price: 95.00, desc: 'Custom-fit sunshades for the panoramic roof and upper windshield area.', rating: 4.7,
    variants: [v('Mesh Fabric','Black',0,4.7,'Black mesh fit for Model X upper glass.'), v('Reflective Mesh','Silver',10,4.8,'Reflective silver option for stronger sun blocking.')] },
  { baseId: 'p3', name: 'Roof rack', category: 'Exterior', models: [M3, MY, MS], price: 449.00, desc: 'Sturdy roof rack system for carrying cargo, bikes, and travel gear.', rating: 4.8,
    variants: [v('Aluminum','Matte Black',0,4.8,'Lightweight matte black aluminum crossbars.'), v('Aluminum','Silver',0,4.7,'Silver aluminum finish for a clean OEM look.')] },
  { baseId: 'p4', name: 'Roof rack / crossbars', category: 'Exterior', models: [CT], price: 499.00, desc: 'Heavy-duty roof rack and crossbars for hauling gear on the Cybertruck.', rating: 4.8,
    variants: [v('Steel','Black',0,4.8,'Rugged black steel crossbars for heavy loads.'), v('Aluminum','Matte Black',20,4.7,'Lighter aluminum option with matte black finish.')] },
  { baseId: 'p5', name: 'Windshield sunshade', category: 'Sun Protection', models: [M3, MY, MS, MX, CT], price: 39.00, desc: 'Foldable reflective sunshade to keep the cabin cooler when parked.', rating: 4.6,
    variants: [v('Reflective Foil','Silver',0,4.6,'Standard silver reflective foil for heat rejection.'), v('Reflective Foil','Black/Silver',5,4.7,'Dual-tone design with black interior-facing side.')] },
  { baseId: 'p6', name: 'Center console organizer trays', category: 'Storage', models: [M3, MY, MS, MX, CT], price: 29.00, desc: 'Multi-compartment trays to keep center console items neatly organized.', rating: 4.5,
    variants: [v('ABS Plastic','Black',0,4.5,'Rigid black ABS tray with multiple compartments.'), v('Silicone Lined','Black',4,4.6,'ABS tray with silicone liner to reduce rattling.')] },
  { baseId: 'p7', name: 'Cup holder inserts', category: 'Interior', models: [M3, MY, MS, MX, CT], price: 19.00, desc: 'Anti-slip silicone inserts to stabilize cups and reduce spills.', rating: 4.5,
    variants: [v('Silicone','Black',0,4.5,'Classic black silicone inserts.'), v('Silicone','Gray',0,4.4,'Gray silicone to match lighter interiors.'), v('Silicone','White',0,4.4,'White silicone for a bright accent.')] },
  { baseId: 'p8', name: 'Hidden armrest storage box', category: 'Storage', models: [M3, MY, MS, MX], price: 34.00, desc: 'Discreet storage box that fits inside the armrest compartment.', rating: 4.4,
    variants: [v('ABS Plastic','Black',0,4.4,'Durable black ABS hidden storage box.'), v('Flocked ABS','Black',5,4.6,'Flocked interior finish for a softer, quieter feel.')] },
  { baseId: 'p9', name: 'Under-screen storage tray', category: 'Storage', models: [M3, MY], price: 24.00, desc: 'Convenient tray beneath the display for small everyday essentials.', rating: 4.5,
    variants: [v('ABS Plastic','Black',0,4.5,'Standard black under-screen tray.'), v('Silicone','Black',3,4.6,'Soft silicone tray with anti-slip surface.')] },
  { baseId: 'p10', name: 'Under-seat storage boxes', category: 'Storage', models: [M3, MY], price: 59.00, desc: 'Low-profile storage boxes designed to fit under the front seats.', rating: 4.5,
    variants: [v('TPE','Black',0,4.5,'Flexible black TPE boxes, easy to clean.'), v('ABS Plastic','Black',6,4.6,'Rigid ABS boxes with structured compartments.')] },
  { baseId: 'p11', name: 'Under-seat storage bins (rear bench)', category: 'Storage', models: [CT], price: 64.00, desc: 'Storage bins designed for the rear bench under-seat area.', rating: 4.6,
    variants: [v('TPE','Black',0,4.6,'Durable black TPE bins for rear bench storage.'), v('ABS Plastic','Black',6,4.5,'Rigid ABS bins with defined sections.')] },
  { baseId: 'p12', name: 'Glovebox organizer', category: 'Storage', models: [M3, MY, MS, MX], price: 22.00, desc: 'Sectioned organizer to keep documents and accessories tidy in the glovebox.', rating: 4.4,
    variants: [v('ABS Plastic','Black',0,4.4,'Black ABS organizer with dividers.'), v('Felt Lined','Black',4,4.5,'Felt-lined organizer for quieter storage.')] },
  { baseId: 'p13', name: 'Trunk side-well storage bins', category: 'Storage', models: [M3, MY, MS], price: 49.00, desc: 'Durable bins that utilize trunk side wells for extra organized storage.', rating: 4.6,
    variants: [v('TPE','Black',0,4.6,'Flexible black TPE side-well bins.'), v('Felt','Black',8,4.5,'Premium felt bins with soft finish.')] },
  { baseId: 'p14', name: 'Collapsible trunk organizer', category: 'Storage', models: [M3, MY, MS, MX], price: 45.00, desc: 'Foldable organizer with compartments to secure groceries and gear in the trunk.', rating: 4.6,
    variants: [v('Oxford Fabric','Black',0,4.6,'Durable black oxford fabric organizer.'), v('Oxford Fabric','Gray',0,4.5,'Gray fabric organizer with dark trim.')] },
  { baseId: 'p15', name: 'Collapsible trunk / bed organizer', category: 'Storage', models: [CT], price: 55.00, desc: 'Collapsible organizer for securing items in the truck bed or trunk area.', rating: 4.6,
    variants: [v('Heavy-Duty Fabric','Black',0,4.6,'Reinforced black fabric for bed/trunk use.'), v('Heavy-Duty Fabric','Gray',0,4.5,'Gray reinforced fabric with rugged stitching.')] },
  { baseId: 'p16', name: 'Trunk grocery bag hook', category: 'Storage', models: [M3], price: 12.00, desc: 'Simple hook accessory to keep shopping bags upright while driving.', rating: 4.3,
    variants: [v('ABS Plastic','Black',0,4.3,'Simple black plastic hook.'), v('Metal','Black',3,4.5,'Sturdier metal hook with black coating.')] },
  { baseId: 'p17', name: 'Door or console trash can', category: 'Interior', models: [M3, MY, MS, MX], price: 18.00, desc: 'Compact trash can that mounts in the door pocket or console area.', rating: 4.3,
    variants: [v('ABS Plastic','Black',0,4.3,'Compact black plastic trash can.'), v('Silicone','Black',4,4.4,'Collapsible silicone trash can.')] },
  { baseId: 'p18', name: 'Console trash can', category: 'Interior', models: [CT], price: 18.00, desc: 'Compact trash can designed to fit in the center console area.', rating: 4.3,
    variants: [v('ABS Plastic','Black',0,4.3,'Black plastic console-fit trash can.'), v('Silicone','Black',4,4.4,'Flexible silicone console trash can.')] },
  { baseId: 'p19', name: '3D all-weather floor mats (cabin, trunk, and frunk)', category: 'Interior Protection', models: [M3, MS, MX], price: 189.00, desc: 'Full-coverage 3D all-weather mats for cabin, trunk, and frunk.', rating: 4.8,
    variants: [v('TPE','Black',0,4.8,'Durable all-weather black TPE mats.'), v('TPE','Gray',10,4.7,'Gray TPE mats for a two-tone interior look.')] },
  { baseId: 'p20', name: '3D all-weather floor mats (cabin, trunk, seatback, and frunk)', category: 'Interior Protection', models: [MY], price: 209.00, desc: 'Full-coverage 3D all-weather mats including seatback protection for Model Y.', rating: 4.8,
    variants: [v('TPE','Black',0,4.8,'All-weather black TPE set with seatback liners.'), v('TPE','Gray',10,4.7,'Gray TPE set including seatback protection.')] },
  { baseId: 'p21', name: '3D all-weather floor mats (cabin, truck bed, and frunk)', category: 'Interior Protection', models: [CT], price: 219.00, desc: 'Heavy-duty 3D all-weather mats for cabin, truck bed, and frunk.', rating: 4.8,
    variants: [v('Heavy-Duty TPE','Black',0,4.8,'Rugged black TPE mats for cabin, bed, and frunk.'), v('Heavy-Duty TPE','Gray',10,4.7,'Gray heavy-duty TPE mats.')] },
  { baseId: 'p22', name: 'Front screen protector (matte tempered glass)', category: 'Screen Protection', models: [M3, MY, MS, MX, CT], price: 35.00, desc: 'Matte tempered glass protector for the front display to reduce glare and fingerprints.', rating: 4.7,
    variants: [v('Tempered Glass','Matte Clear',0,4.7,'Anti-glare matte finish tempered glass.'), v('Tempered Glass','Gloss Clear',0,4.6,'High-clarity gloss tempered glass.')] },
  { baseId: 'p23', name: 'Rear screen protector', category: 'Screen Protection', models: [M3, MY, MS, MX, CT], price: 25.00, desc: 'Clear protective film for the rear passenger display.', rating: 4.6,
    variants: [v('Tempered Glass','Matte Clear',0,4.6,'Matte rear screen protector to reduce glare.'), v('Tempered Glass','Gloss Clear',0,4.5,'Gloss clear protector for maximum clarity.')] },
  { baseId: 'p24', name: 'Door sill and trunk lip protector stickers', category: 'Exterior Protection', models: [M3, MY, MS, MX], price: 27.00, desc: 'Protective stickers to guard door sills and trunk lip from scuffs and scratches.', rating: 4.5,
    variants: [v('Carbon Fiber Vinyl','Black',0,4.5,'Carbon-fiber textured black protective film.'), v('TPU Film','Clear',3,4.6,'Transparent TPU film for discreet protection.')] },
  { baseId: 'p25', name: 'Door sill protector stickers', category: 'Exterior Protection', models: [CT], price: 24.00, desc: 'Protective stickers to guard door sills from scuffs and scratches.', rating: 4.5,
    variants: [v('Carbon Fiber Vinyl','Black',0,4.5,'Textured black carbon-fiber vinyl stickers.'), v('TPU Film','Clear',3,4.6,'Clear TPU stickers for subtle protection.')] },
  { baseId: 'p26', name: 'Mud flaps', category: 'Exterior Protection', models: [M3, MY, MS, MX, CT], price: 42.00, desc: 'Durable mud flaps to help shield paint from road debris and splashes.', rating: 4.6,
    variants: [v('TPE','Black',0,4.6,'Flexible black TPE mud flaps.'), v('PP Plastic','Black',4,4.5,'Rigid black polypropylene mud flaps.')] },
  { baseId: 'p27', name: 'Door edge guards', category: 'Exterior Protection', models: [M3, MY, MS, MX, CT], price: 16.00, desc: 'Slim guards that protect door edges from chips and paint damage.', rating: 4.4,
    variants: [v('Rubber','Black',0,4.4,'Black rubber edge guards.'), v('Rubber','Clear',0,4.3,'Clear rubber guards for a subtle look.')] },
  { baseId: 'p28', name: 'Paint Protection Film (PPF)', category: 'Exterior Protection', models: [M3, MY, MS, MX], price: 299.00, desc: 'Transparent protective film kit to help defend high-impact areas from scratches and chips.', rating: 4.7,
    variants: [v('TPU PPF','Gloss Clear',0,4.7,'Gloss clear self-healing TPU film.'), v('TPU PPF','Matte Clear',30,4.8,'Matte finish PPF for a satin look.')] },
  { baseId: 'p29', name: 'Paint Protection Film (PPF) / vinyl wrap', category: 'Exterior Protection', models: [CT], price: 349.00, desc: 'Protective film or vinyl wrap kit to help shield exterior surfaces.', rating: 4.7,
    variants: [v('TPU PPF','Gloss Clear',0,4.7,'Gloss clear protective film.'), v('Vinyl Wrap','Matte Black',40,4.8,'Matte black vinyl wrap for protection and style.')] },
  { baseId: 'p30', name: 'Seat covers and seat-back kick mats', category: 'Interior Protection', models: [M3, MY, MS, MX, CT], price: 79.00, desc: 'Protective seat covers with kick mats to keep upholstery clean from wear and marks.', rating: 4.5,
    variants: [v('PU Leather','Black',0,4.5,'Easy-clean black PU leather covers.'), v('PU Leather','White',10,4.4,'White PU leather for a premium look.'), v('Fabric','Gray',-5,4.5,'Breathable gray fabric covers.')] },
  { baseId: 'p31', name: 'Neck and lumbar support pillows', category: 'Comfort', models: [M3, MY, MS, MX, CT], price: 36.00, desc: 'Ergonomic cushions for added neck and lower-back support on drives.', rating: 4.6,
    variants: [v('Memory Foam','Black',0,4.6,'Black memory foam cushions.'), v('Memory Foam','Gray',0,4.5,'Gray memory foam cushions.'), v('Memory Foam','Beige',0,4.5,'Beige cushions for lighter interiors.')] },
  { baseId: 'p32', name: 'Foldable steering wheel desk/tray', category: 'Interior', models: [M3, MY], price: 28.00, desc: 'Portable tray that mounts on the steering wheel for work or meals while parked.', rating: 4.2,
    variants: [v('ABS Plastic','Black',0,4.2,'Lightweight black ABS tray.'), v('Bamboo','Natural',6,4.4,'Natural bamboo finish tray.')] },
  { baseId: 'p33', name: 'Foldable steering wheel desk/tray (for round steering wheel)', category: 'Interior', models: [MS, MX], price: 28.00, desc: 'Portable tray designed for round steering wheels, for use while parked.', rating: 4.2,
    variants: [v('ABS Plastic','Black',0,4.2,'Black ABS tray for round steering wheels.'), v('Bamboo','Natural',6,4.4,'Bamboo finish tray for round steering wheels.')] },
  { baseId: 'p34', name: 'Under-seat air vent protective covers', category: 'Interior Protection', models: [M3, MY], price: 21.00, desc: 'Protective covers to prevent debris from entering under-seat air vents.', rating: 4.4,
    variants: [v('ABS Mesh','Black',0,4.4,'Black ABS mesh vent covers.'), v('Stainless Mesh','Black',5,4.5,'Reinforced stainless mesh covers.')] },
  { baseId: 'p35', name: 'Center console USB hub', category: 'Electronics', models: [M3, MY, MS], price: 39.00, desc: 'Multi-port USB hub for charging devices and expanding console connectivity.', rating: 4.5,
    variants: [v('Plastic','Black',0,4.5,'Compact black multi-port USB hub.'), v('Aluminum','Space Gray',8,4.6,'Premium aluminum housing hub.')] },
  { baseId: 'p36', name: 'High-speed SSD drive for dashcam/Sentry Mode', category: 'Electronics', models: [M3, MY, MS, MX, CT], price: 119.00, desc: 'Reliable high-speed SSD optimized for dashcam and Sentry Mode recordings.', rating: 4.8,
    variants: [v('SSD 500GB','Black',0,4.8,'500GB high-endurance SSD.'), v('SSD 1TB','Black',40,4.9,'1TB high-endurance SSD for extended recording.')] },
  { baseId: 'p37', name: 'Magnetic phone mount (MagSafe)', category: 'Electronics', models: [M3, MY, MS, MX, CT], price: 32.00, desc: 'Secure magnetic MagSafe-compatible mount for convenient phone access.', rating: 4.6,
    variants: [v('Aluminum','Black',0,4.6,'Black aluminum magnetic mount.'), v('Aluminum','Silver',0,4.5,'Silver aluminum magnetic mount.')] },
  { baseId: 'p38', name: 'Tesla logo puddle lights', category: 'Lighting', models: [M3, MY, MS], price: 30.00, desc: 'Door puddle lights projecting a crisp logo illumination onto the ground.', rating: 4.5,
    variants: [v('LED','White',0,4.5,'Bright white logo projection.'), v('LED','Red',2,4.4,'Red-tinted logo projection.')] },
  { baseId: 'p39', name: 'Tesla logo puddle lights (front doors)', category: 'Lighting', models: [MX], price: 30.00, desc: 'Front-door puddle lights projecting a crisp logo illumination onto the ground.', rating: 4.5,
    variants: [v('LED','White',0,4.5,'White front-door logo projection.'), v('LED','Red',2,4.4,'Red front-door logo projection.')] },
  { baseId: 'p40', name: 'Puddle lights', category: 'Lighting', models: [CT], price: 30.00, desc: 'Door puddle lights for added visibility and style when entering or exiting.', rating: 4.5,
    variants: [v('LED','White',0,4.5,'Bright white puddle lights.'), v('LED','Cool White',2,4.4,'Cool white LED puddle lights.')] },
  { baseId: 'p41', name: 'Interior ambient LED lighting', category: 'Lighting', models: [M3, MY], price: 65.00, desc: 'Accent LED lighting kit to enhance the cabin atmosphere.', rating: 4.6,
    variants: [v('LED Strip','RGB',0,4.6,'Multi-color RGB ambient lighting kit.'), v('LED Strip','Warm White',-5,4.5,'Warm white ambient lighting kit.')] },
  { baseId: 'p42', name: 'Smart physical shortcut buttons (S3XY Buttons)', category: 'Electronics', models: [M3, MY, MS, MX, CT], price: 129.00, desc: 'Programmable physical shortcut buttons for quick access to common vehicle actions.', rating: 4.7,
    variants: [v('Plastic','Black',0,4.7,'Black programmable button set.'), v('Plastic','White',0,4.6,'White programmable button set.')] },
  { baseId: 'p43', name: 'Wireless car karaoke microphone', category: 'Entertainment', models: [M3, MY, MS, MX, CT], price: 49.00, desc: 'Wireless microphone for in-car karaoke and entertainment.', rating: 4.4,
    variants: [v('Metal/Plastic','Black',0,4.4,'Black wireless karaoke microphone.'), v('Metal/Plastic','Silver',0,4.4,'Silver wireless karaoke microphone.')] },
  { baseId: 'p44', name: 'Temperature-display thermos mug', category: 'Lifestyle', models: [M3, MY, MS, MX, CT], price: 26.00, desc: 'Insulated travel mug with a built-in temperature display.', rating: 4.5,
    variants: [v('Stainless Steel','Black',0,4.5,'Black insulated thermos mug.'), v('Stainless Steel','White',0,4.4,'White insulated thermos mug.'), v('Stainless Steel','Red',0,4.4,'Red insulated thermos mug.')] },
  { baseId: 'p45', name: 'Compact cordless car vacuum', category: 'Maintenance', models: [M3, MY, MS, MX, CT], price: 59.00, desc: 'Portable cordless vacuum for quick interior cleanups.', rating: 4.5,
    variants: [v('Plastic','Black',0,4.5,'Black compact cordless vacuum.'), v('Plastic','Gray',0,4.4,'Gray compact cordless vacuum.')] },
  { baseId: 'p46', name: 'Portable air compressor and tire repair kit', category: 'Maintenance', models: [M3, MY, MS, MX, CT], price: 74.00, desc: 'Compact compressor with tire repair essentials for on-the-road emergencies.', rating: 4.7,
    variants: [v('Standard Kit','Black',0,4.7,'Compressor with basic tire repair tools.'), v('Deluxe Kit','Black',15,4.8,'Includes extra plugs, tools, and carrying case.')] },
  { baseId: 'p47', name: 'Lifting jack pads', category: 'Maintenance', models: [M3, MY, MS, MX, CT], price: 22.00, desc: 'Protective jack pads designed for safe lifting at vehicle jack points.', rating: 4.8,
    variants: [v('Rubber','Black',0,4.8,'Durable black rubber jack pads (set).'), v('Polyurethane','Black',5,4.7,'High-strength polyurethane jack pads.')] },
  { baseId: 'p48', name: 'Charging adapter (J1772 / Type 2) for public stations', category: 'Charging', models: [M3, MY, MS, MX, CT], price: 55.00, desc: 'Adapter for connecting to compatible J1772 / Type 2 public charging stations.', rating: 4.7,
    variants: [v('J1772 Adapter','Black',0,4.7,'J1772 to Tesla adapter for public stations.'), v('Type 2 Adapter','Black',5,4.7,'Type 2 compatible adapter variant.')] },
  { baseId: 'p49', name: 'Portable home-outlet charger (Mobile Connector)', category: 'Charging', models: [M3, MY, MS, MX, CT], price: 230.00, desc: 'Portable charger for convenient charging from compatible home outlets.', rating: 4.8,
    variants: [v('Standard','Black',0,4.8,'Portable mobile connector with standard outlet plug.'), v('Dual Plug Kit','Black',25,4.8,'Includes additional outlet adapter plug.')] },
  { baseId: 'p50', name: 'Charging cable organizer wall hook', category: 'Charging', models: [M3, MY, MS, MX, CT], price: 17.00, desc: 'Wall-mounted hook to neatly store and organize charging cables.', rating: 4.6,
    variants: [v('ABS Plastic','Black',0,4.6,'Black wall-mounted cable hook.'), v('Metal','Black',4,4.7,'Heavy-duty metal cable hook.')] },
  { baseId: 'p51', name: 'Full exterior car cover', category: 'Exterior Protection', models: [M3, MY, MS, MX, CT], price: 149.00, desc: 'All-weather exterior cover to protect the vehicle when parked outdoors or indoors.', rating: 4.6,
    variants: [v('Polyester','Silver',0,4.6,'Reflective silver all-weather cover.'), v('Polyester','Black',0,4.5,'Black all-weather cover.'), v('Multi-Layer','Gray',20,4.7,'Premium multi-layer gray cover for extra protection.')] },
  { baseId: 'p52', name: 'Emergency escape tool (window breaker and seatbelt cutter)', category: 'Safety', models: [M3, MY, MS, MX, CT], price: 15.00, desc: 'Compact emergency tool with a window breaker and seatbelt cutter.', rating: 4.8,
    variants: [v('ABS/Steel','Red',0,4.8,'High-visibility red emergency tool.'), v('ABS/Steel','Black',0,4.7,'Low-profile black emergency tool.')] },
  { baseId: 'p53', name: 'Custom wheel covers', category: 'Exterior', models: [M3, MY, CT], price: 99.00, desc: 'Stylish wheel covers to refresh the look and help improve aerodynamics.', rating: 4.5,
    variants: [v('ABS Plastic','Matte Black',0,4.5,'Matte black aerodynamic wheel covers.'), v('ABS Plastic','Gloss Black',5,4.4,'Gloss black wheel covers.'), v('ABS Plastic','Silver',5,4.4,'Silver finish wheel covers.')] },
  { baseId: 'p54', name: 'Rear spoiler', category: 'Exterior', models: [M3, MY, MS], price: 179.00, desc: 'Sporty rear spoiler accessory for an enhanced exterior appearance.', rating: 4.7,
    variants: [v('ABS Plastic','Matte Black',0,4.7,'Matte black sport spoiler.'), v('ABS Plastic','Gloss Black',10,4.7,'Gloss black sport spoiler.'), v('Carbon Fiber','Gloss Carbon',60,4.8,'Real carbon fiber look spoiler.')] },
  { baseId: 'p55', name: 'Metal sport pedals', category: 'Interior', models: [M3, MY, MS, MX, CT], price: 45.00, desc: 'Brushed metal pedal covers for a sportier look and improved grip.', rating: 4.6,
    variants: [v('Aluminum','Silver',0,4.6,'Brushed silver aluminum pedals.'), v('Aluminum','Black',5,4.6,'Black anodized aluminum pedals.')] },
  { baseId: 'p56', name: 'Steering wheel cover', category: 'Interior', models: [M3, MY], price: 29.00, desc: 'Comfortable steering wheel cover for improved grip and protection.', rating: 4.4,
    variants: [v('Leather','Black',0,4.5,'Classic black leather cover.'), v('Leather','White',3,4.4,'White leather cover.'), v('Alcantara','Black',8,4.6,'Premium black Alcantara-style cover.')] },
  { baseId: 'p57', name: 'Steering wheel cover (for round steering wheel)', category: 'Interior', models: [MS, MX], price: 29.00, desc: 'Comfortable steering wheel cover designed for round steering wheels.', rating: 4.4,
    variants: [v('Leather','Black',0,4.5,'Black leather cover for round steering wheel.'), v('Leather','Beige',3,4.4,'Beige leather cover for round steering wheel.'), v('Alcantara','Black',8,4.6,'Black Alcantara-style cover for round steering wheel.')] },
  { baseId: 'p58', name: 'Door weather stripping seals (wind noise reduction)', category: 'Exterior Protection', models: [M3, MY, MS, MX], price: 38.00, desc: 'Weather stripping seals designed to reduce wind noise and improve cabin sealing.', rating: 4.5,
    variants: [v('EPDM Rubber','Black',0,4.5,'Standard black EPDM rubber seals.'), v('Double-Layer Rubber','Black',8,4.7,'Thicker double-layer seals for extra noise reduction.')] }
];

function modelKey(m) {
  if (m.startsWith('Model 3')) return 'm3';
  if (m.startsWith('Model Y')) return 'my';
  if (m.startsWith('Model S')) return 'ms';
  if (m.startsWith('Model X')) return 'mx';
  if (m.startsWith('Cybertruck')) return 'ct';
  return 'all';
}
function modelLabelForImage(m) {
  if (m.startsWith('Model 3')) return 'Tesla Model 3 Highland';
  if (m.startsWith('Model Y')) return 'Tesla Model Y Juniper';
  return 'Tesla ' + m;
}
function imageFor(name, model, variant) {
  const variantText = variant ? ` ${variant.material} ${variant.color}` : '';
  const q = encodeURIComponent(`${name}${variantText} for ${modelLabelForImage(model)} accessory`);
  return `https://tse2.mm.bing.net/th?q=${q}&w=640&h=360&c=7&rs=1&p=0&dpr=1&pid=1.7&mkt=en-US&adlt=moderate`;
}

function expandBase(p) {
  const baseRating = p.rating || DEF_RATING;
  const variants = (p.variants && p.variants.length) ? p.variants : [v('Standard', 'Default', 0, baseRating, p.desc)];
  return p.models.flatMap(m => {
    const vlist = variants.map((vr, i) => ({ ...vr, id: `v${i + 1}`, image: imageFor(p.name, m, vr) }));
    return [{
      id: `${p.baseId}-${modelKey(m)}`,
      baseId: p.baseId,
      name: p.name,
      category: p.category,
      models: [m],
      basePrice: p.price,
      desc: p.desc,
      rating: baseRating,
      variants: vlist,
      selectedVariant: 0
    }];
  });
}

const PRODUCTS = BASE_PRODUCTS.flatMap(expandBase);

const state = {
  model: 'All',
  category: 'All',
  query: '',
  cart: loadCart(),
  selections: {},
  modalProductId: null
};

const els = {
  grid: document.getElementById('productGrid'),
  meta: document.getElementById('catalogMeta'),
  search: document.getElementById('searchInput'),
  category: document.getElementById('categorySelect'),
  productSelect: document.getElementById('productSelect'),
  productSuggestions: document.getElementById('productSuggestions'),
  modelFilters: document.getElementById('modelFilters'),
  cartCount: document.getElementById('cartCount'),
  cartDrawer: document.getElementById('cartDrawer'),
  cartItems: document.getElementById('cartItems'),
  cartTotal: document.getElementById('cartTotal'),
  overlay: document.getElementById('overlay'),
  openCart: document.getElementById('openCartBtn'),
  closeCart: document.getElementById('closeCartBtn'),
  checkout: document.getElementById('checkoutBtn'),
  toast: document.getElementById('toast'),
  year: document.getElementById('year'),
  productModal: document.getElementById('productModal'),
  productModalInner: document.getElementById('productModalInner')
};

function formatPrice(n) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

function loadCart() {
  try { return JSON.parse(localStorage.getItem('vd_cart') || '{}'); } catch { return {}; }
}
function saveCart() { localStorage.setItem('vd_cart', JSON.stringify(state.cart)); }

function initCategories() {
  const cats = ['All', ...Array.from(new Set(PRODUCTS.map(p => p.category))).sort()];
  els.category.innerHTML = cats.map(c => `<option value="${c}">${c === 'All' ? 'All categories' : c}</option>`).join('');
}

function initProductPicker() {
  const names = Array.from(new Set(PRODUCTS.map(p => p.name))).sort((a,b) => a.localeCompare(b));
  els.productSelect.innerHTML = `<option value="">All products (select specific)</option>` + names.map(n => `<option value="${n.replace(/"/g,'&quot;')}">${n}</option>`).join('');
  els.productSuggestions.innerHTML = names.map(n => `<option value="${n.replace(/"/g,'&quot;')}"></option>`).join('');
}

function filteredProducts() {
  return PRODUCTS.filter(p => {
    const modelOk = state.model === 'All' || p.models.some(m => m.startsWith(state.model));
    const catOk = state.category === 'All' || p.category === state.category;
    const q = state.query.trim().toLowerCase();
    const vtext = p.variants.map(vr => `${vr.label} ${vr.material} ${vr.color} ${vr.desc}`).join(' ');
    const qOk = !q || p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.models.some(m => m.toLowerCase().includes(q)) || vtext.toLowerCase().includes(q);
    return modelOk && catOk && qOk;
  });
}

function stars(rating) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  const s = '★'.repeat(full) + (half ? '⯪' : '') + '☆'.repeat(empty);
  return `<span class="stars" aria-label="Rated ${rating} out of 5">${s} <span class="rating-num">${rating.toFixed(1)}</span></span>`;
}

function currentVariant(p) {
  const idx = state.selections[p.id] ?? 0;
  return p.variants[idx] || p.variants[0];
}
function variantPrice(p, vr) { return p.basePrice + (vr.priceDelta || 0); }

function renderProducts() {
  const items = filteredProducts();
  els.meta.textContent = `Showing ${items.length} part${items.length === 1 ? '' : 's'}${state.model !== 'All' ? ' for ' + state.model : ''}`;
  if (!items.length) {
    els.grid.innerHTML = `<div class="empty">No parts match your filters. Try a different model, category, or search.</div>`;
    return;
  }
  els.grid.innerHTML = items.map(p => {
    const idx = state.selections[p.id] ?? 0;
    const vr = p.variants[idx] || p.variants[0];
    const options = p.variants.map((vopt, i) => `<option value="${i}" ${i === idx ? 'selected' : ''}>${vopt.label} (${formatPrice(variantPrice(p, vopt))})</option>`).join('');
    return `
    <article class="card clickable" data-open-product="${p.id}" tabindex="0" role="button" aria-label="View details for ${p.name}">
      <div class="card-top">
        <span class="badge">${p.category}</span>
        <span class="meta">${p.models.join(', ')}</span>
      </div>
      <img class="part-image" src="${vr.image}" alt="${p.name} ${vr.label} for ${p.models[0]}" loading="lazy" referrerpolicy="no-referrer" onerror="this.onerror=null;this.replaceWith(Object.assign(document.createElement('div'),{className:'part-icon',textContent:'Image unavailable'}));">
      <h3>${p.name}</h3>
      <div class="rating-row">${stars(p.rating)} <span class="meta">Item</span></div>
      <p class="item-desc"><strong>Item:</strong> ${p.desc}</p>
      <div class="variant-box" data-stop-open="true">
        <label class="variant-label">Type / material / color
          <select class="variant-select" data-variant-for="${p.id}">${options}</select>
        </label>
        <div class="variant-meta">${stars(vr.rating)} <span class="meta">Selected type</span></div>
        <p class="variant-desc"><strong>Type:</strong> ${vr.desc}</p>
      </div>
      <div class="price-row">
        <span class="price">${formatPrice(variantPrice(p, vr))}</span>
        <div class="card-actions">
          <button class="btn btn-secondary add-btn" data-add="${p.id}" data-stop-open="true">Add to cart</button>
          <span class="view-hint">View details</span>
        </div>
      </div>
    </article>`;
  }).join('');
}

function parseCartKey(key) {
  const idx = key.lastIndexOf('::');
  if (idx === -1) return { pid: key, vid: null };
  return { pid: key.slice(0, idx), vid: key.slice(idx + 2) };
}
function cartEntries() {
  return Object.entries(state.cart).map(([key, qty]) => {
    const { pid, vid } = parseCartKey(key);
    const product = PRODUCTS.find(p => p.id === pid);
    if (!product) return null;
    const variant = product.variants.find(vr => vr.id === vid) || product.variants[0];
    return { key, product, variant, qty };
  }).filter(Boolean);
}

function cartTotal() {
  return cartEntries().reduce((sum, e) => sum + variantPrice(e.product, e.variant) * e.qty, 0);
}

function renderCart() {
  const entries = cartEntries();
  const count = entries.reduce((s, e) => s + e.qty, 0);
  els.cartCount.textContent = count;
  els.cartTotal.textContent = formatPrice(cartTotal());
  if (!entries.length) {
    els.cartItems.innerHTML = `<div class="empty">Your cart is empty. Browse the catalog to add parts.</div>`;
    return;
  }
  els.cartItems.innerHTML = entries.map(({ key, product: p, variant, qty }) => `
    <div class="cart-item">
      <h4>${p.name}</h4>
      <div class="meta">${p.models.join(', ')} · ${variant.label}</div>
      <div class="meta">${formatPrice(variantPrice(p, variant))} each</div>
      <div class="cart-row">
        <div class="qty-controls">
          <button class="qty-btn" data-qty="${key}" data-delta="-1" aria-label="Decrease quantity">−</button>
          <span>${qty}</span>
          <button class="qty-btn" data-qty="${key}" data-delta="1" aria-label="Increase quantity">+</button>
        </div>
        <button class="remove-btn" data-remove="${key}">Remove</button>
      </div>
    </div>
  `).join('');
}

function openCart() {
  closeProductModal();
  els.cartDrawer.classList.add('open');
  els.cartDrawer.setAttribute('aria-hidden', 'false');
  els.overlay.hidden = false;
}
function closeCart() {
  els.cartDrawer.classList.remove('open');
  els.cartDrawer.setAttribute('aria-hidden', 'true');
  if (!els.productModal.classList.contains('open')) els.overlay.hidden = true;
}

function renderProductModal() {
  const p = PRODUCTS.find(x => x.id === state.modalProductId);
  if (!p) { closeProductModal(); return; }
  const idx = state.selections[p.id] ?? 0;
  const vr = p.variants[idx] || p.variants[0];
  const options = p.variants.map((vopt, i) => `
    <button class="variant-choice ${i===idx?'active':''}" data-modal-variant="${i}">
      <span class="vname">${vopt.label}</span>
      <span class="vprice">${formatPrice(variantPrice(p, vopt))}</span>
      <span class="vrating">${stars(vopt.rating)}</span>
    </button>`).join('');
  els.productModalInner.innerHTML = `
    <div class="modal-topbar">
      <div>
        <span class="badge">${p.category}</span>
        <span class="meta">${p.models.join(', ')}</span>
      </div>
      <button class="icon-btn" id="closeModalBtn" aria-label="Close details">&times;</button>
    </div>
    <div class="modal-content">
      <div class="modal-media">
        <img class="modal-image" src="${vr.image}" alt="${p.name} ${vr.label} for ${p.models[0]}" referrerpolicy="no-referrer" onerror="this.onerror=null;this.replaceWith(Object.assign(document.createElement('div'),{className:'part-icon modal-fallback',textContent:'Image unavailable'}));">
      </div>
      <div class="modal-info">
        <h2>${p.name}</h2>
        <div class="rating-row">${stars(p.rating)} <span class="meta">Item rating</span></div>
        <p class="item-desc"><strong>Item description:</strong> ${p.desc}</p>
        <div class="modal-section">
          <h3>Choose type / material / color</h3>
          <div class="variant-choices">${options}</div>
        </div>
        <div class="modal-section selected-type-box">
          <h3>Selected type details</h3>
          <p><strong>${vr.label}</strong></p>
          <div class="variant-meta">${stars(vr.rating)} <span class="meta">Type rating</span></div>
          <p class="variant-desc">${vr.desc}</p>
          <p class="modal-price">${formatPrice(variantPrice(p, vr))}</p>
        </div>
        <div class="modal-actions">
          <button class="btn btn-primary" id="modalAddBtn" data-add="${p.id}">Add selected type to cart</button>
          <p class="notice-inline">Preview store — checkout not available yet.</p>
        </div>
      </div>
    </div>`;
}

function openProductModal(pid) {
  state.modalProductId = pid;
  renderProductModal();
  els.productModal.classList.add('open');
  els.productModal.setAttribute('aria-hidden', 'false');
  els.overlay.hidden = false;
  document.body.style.overflow = 'hidden';
}
function closeProductModal() {
  state.modalProductId = null;
  els.productModal.classList.remove('open');
  els.productModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (!els.cartDrawer.classList.contains('open')) els.overlay.hidden = true;
}

let toastTimer;
function showToast(msg) {
  els.toast.textContent = msg;
  els.toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => els.toast.classList.remove('show'), 3200);
}

function addToCart(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  const vr = currentVariant(p);
  const key = `${id}::${vr.id}`;
  state.cart[key] = (state.cart[key] || 0) + 1;
  saveCart();
  renderCart();
  showToast(`${p.name} (${vr.label}) added to cart.`);
}

function bindEvents() {
  els.modelFilters.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-model]');
    if (!btn) return;
    state.model = btn.dataset.model;
    els.modelFilters.querySelectorAll('.model-chip').forEach(b => b.classList.toggle('active', b === btn));
    renderProducts();
  });

  els.search.addEventListener('input', (e) => {
    state.query = e.target.value;
    if (els.productSelect && els.productSelect.value && els.productSelect.value !== e.target.value) {
      els.productSelect.value = '';
    }
    renderProducts();
  });
  if (els.productSelect) {
    els.productSelect.addEventListener('change', (e) => {
      const val = e.target.value;
      state.query = val;
      if (els.search) els.search.value = val;
      renderProducts();
    });
  }
  els.category.addEventListener('change', (e) => { state.category = e.target.value; renderProducts(); });

  els.grid.addEventListener('click', (e) => {
    if (e.target.closest('[data-stop-open="true"]') || e.target.closest('select') || e.target.closest('button[data-add]')) {
      const btn = e.target.closest('[data-add]');
      if (btn) { e.stopPropagation(); addToCart(btn.dataset.add); }
      return;
    }
    const card = e.target.closest('[data-open-product]');
    if (card) openProductModal(card.dataset.openProduct);
  });

  els.grid.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.closest('[data-open-product]') && !e.target.closest('select,button,[data-stop-open="true"]')) {
      e.preventDefault();
      openProductModal(e.target.closest('[data-open-product]').dataset.openProduct);
    }
  });

  els.grid.addEventListener('change', (e) => {
    const sel = e.target.closest('[data-variant-for]');
    if (!sel) return;
    const pid = sel.dataset.variantFor;
    state.selections[pid] = Number(sel.value) || 0;
    renderProducts();
    if (state.modalProductId === pid) renderProductModal();
  });

  els.productModal.addEventListener('click', (e) => {
    if (e.target.id === 'productModal') closeProductModal();
    if (e.target.closest('#closeModalBtn')) closeProductModal();
    const vbtn = e.target.closest('[data-modal-variant]');
    if (vbtn && state.modalProductId) {
      state.selections[state.modalProductId] = Number(vbtn.dataset.modalVariant) || 0;
      renderProductModal();
      renderProducts();
    }
    const addBtn = e.target.closest('#modalAddBtn');
    if (addBtn) addToCart(addBtn.dataset.add);
  });

  els.openCart.addEventListener('click', openCart);
  els.closeCart.addEventListener('click', closeCart);
  els.overlay.addEventListener('click', () => { closeCart(); closeProductModal(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { closeProductModal(); closeCart(); }
  });

  els.cartItems.addEventListener('click', (e) => {
    const qtyBtn = e.target.closest('[data-qty]');
    const remBtn = e.target.closest('[data-remove]');
    if (qtyBtn) {
      const key = qtyBtn.dataset.qty;
      const delta = Number(qtyBtn.dataset.delta);
      state.cart[key] = (state.cart[key] || 0) + delta;
      if (state.cart[key] <= 0) delete state.cart[key];
      saveCart(); renderCart();
    }
    if (remBtn) {
      delete state.cart[remBtn.dataset.remove];
      saveCart(); renderCart();
    }
  });

  els.checkout.addEventListener('click', () => {
    const count = cartEntries().reduce((s, e) => s + e.qty, 0);
    if (!count) { showToast('Your cart is empty. Add parts before checkout.'); return; }
    showToast('Online purchasing is not available yet. Checkout is coming soon — your cart and prices are saved for preview.');
  });
}

function init() {
  els.year.textContent = new Date().getFullYear();
  initCategories();
  initProductPicker();
  bindEvents();
  renderProducts();
  renderCart();
}

init();
