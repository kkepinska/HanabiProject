export interface action {
    player: string;
    actionType: ("hint" | "discard" | "play");
}