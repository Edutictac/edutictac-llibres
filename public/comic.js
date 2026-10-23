/* Standard Fabric objects only: comic pages remain portable Slides scenes. */
export const layouts = [2, 3, 4];
const origin = {originX: 'left', originY: 'top'};

export function panelBoxes(layout) {
  if (!layouts.includes(layout)) return [];
  const columns = layout === 3 ? 3 : 2, rows = layout === 4 ? 2 : 1;
  const width = (1160 - (columns - 1) * 24) / columns;
  const height = (530 - (rows - 1) * 24) / rows;
  return Array.from({length: layout}, (_, index) => ({
    left: 60 + (index % columns) * (width + 24),
    top: 130 + Math.floor(index / columns) * (height + 24), width, height,
  }));
}

export function comicPanels(fabric, layout) {
  return panelBoxes(layout).flatMap((box, index) => {
    const frame = new fabric.Rect({...origin, ...box, fill: '#fff', stroke: '#193f38', strokeWidth: 3});
    frame.slideMeta = {comicPanel: {version: 1, layout, index}};
    const number = new fabric.Textbox(String(index + 1), {
      ...origin, left: box.left + 12, top: box.top + 8, width: 35,
      fontSize: 16, fontFamily: 'Arial', fill: '#65756c',
    });
    number.slideMeta = {comicPanelLabel: true};
    return [frame, number];
  });
}

export function bubbleData(object) {
  const value = object?.slideMeta?.comicBubble;
  return value?.version === 1 && typeof value.id === 'string' &&
    ['speech', 'thought', 'narration'].includes(value.kind) && typeof value.text === 'string'
    ? value : null;
}

export function makeBubble(fabric, {id, kind, text}, box) {
  text = text.trim();
  if (!['speech', 'thought', 'narration'].includes(kind) || !text || text.length > 300)
    throw new Error('comicTextTooLong');
  const width = Math.min(300, box.width - 50), maximum = Math.min(210, box.height - 85);
  const caption = new fabric.Textbox(text, {
    ...origin, left: 20, top: 16, width: width - 40, fontFamily: 'Arial',
    fontSize: 24, fill: '#193f38', lineHeight: 1.15, textAlign: 'center',
  });
  const padding = kind === 'thought' ? 44 : 32;
  if (kind === 'thought') { caption.set({left:30,top:22,width:width-60}); caption.initDimensions(); }
  const textWidth=width-(kind==='thought'?60:40);
  while ((caption.height > maximum - padding || caption.width > textWidth+1) && caption.fontSize > 16) {
    caption.set({fontSize:caption.fontSize-1,width:textWidth}); caption.initDimensions();
  }
  if (caption.height > maximum - padding || caption.width > textWidth+1) throw new Error('comicTextTooLong');
  const height = Math.max(70, caption.height + padding), objects = [];
  const ink = {fill: kind === 'narration' ? '#fff0c9' : '#fff', stroke: '#193f38', strokeWidth: 2};
  if (kind === 'speech') objects.push(new fabric.Path(
    `M ${width * .55} ${height - 4} L ${width * .4} ${height + 24} L ${width * .38} ${height - 4} Z`,
    {...origin, ...ink},
  ));
  if (kind === 'thought') {
    for (const [x, y, radius] of [[width * .55, height + 3, 8], [width * .48, height + 20, 5]])
      objects.push(new fabric.Circle({...origin, ...ink, left: x, top: y, radius}));
    objects.push(new fabric.Ellipse({...origin, ...ink, left: 0, top: 0, rx: width / 2, ry: height / 2}));
  } else objects.push(new fabric.Rect({...origin, ...ink, left: 0, top: 0, width, height, rx: kind === 'speech' ? 18 : 0, ry: kind === 'speech' ? 18 : 0}));
  objects.push(caption);
  const group = new fabric.Group(objects, {
    ...origin, left: box.left + 25, top: box.top + 35,
    lockScalingFlip: true, lockSkewingX: true, lockSkewingY: true,
  });
  group.slideMeta = {comicBubble: {version: 1, id, kind, text}};
  return group;
}

export function protectPanels(canvas, uuid) {
  const ids = new Set();
  for (const object of canvas.getObjects()) {
    if (object.slideMeta?.comicPanel || object.slideMeta?.comicPanelLabel) {
      object.set({selectable: false, evented: false});
    }
    const data = bubbleData(object);
    if (data) {
      // Native duplicate/paste must not leave two bubbles with the same ID.
      if (ids.has(data.id)) object.slideMeta = {...object.slideMeta, comicBubble: {...data, id: uuid()}};
      ids.add(object.slideMeta.comicBubble.id);
    }
  }
}
