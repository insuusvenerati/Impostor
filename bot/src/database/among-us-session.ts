import { Collection, Entity, Enum, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { LobbyRegion, SessionState } from "../constants";
import SessionChannel from "./session-channel";

/**
 * Represents an active among-us session, that includes the region,
 * code, and channels/categories created.
 */
@Entity()
export default class AmongUsSession {
    @PrimaryKey()
    id!: number;

    /**
     * The guild the among us session is in.
     */
    @Property()
    guild!: string;

    /**
     * The id of the channel the command was invoked in.
     */
    @Property()
    channel!: string;

    /**
     * The id of our message response to the command invocation.
     */
    @Property()
    message!: string;

    /**
     * The name of the player that invoked the command. Note: not player ID.
     */
    @Property()
    user!: string;

    /**
     * The state this session is in (discussing/playing).
     */
    @Enum()
    state!: SessionState;

    /**
     * The region of the session (asia/na/eu).
     */
    @Property()
    region!: LobbyRegion;

    /**
     * The 6-letter lobby code.
     */
    @Property()
    lobbyCode!: string;

    /**
     * The channels created by this session.
     */
    @OneToMany(() => SessionChannel, channel => channel.session)
    channels = new Collection<SessionChannel>(this);
}
